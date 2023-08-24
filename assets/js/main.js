"use strict"



let cityName="", 
    days,
    today,
    search = document.getElementById('search');

let flagUrl = false;

let todayDay = document.getElementById('todayDay'),
    todayDate = document.getElementById('todayDate'),
    todayDegree = document.getElementById('todayDegree'),
    todayCondition = document.getElementById('todayCondition'),
    todayIcon = document.getElementById('todayIcon'),
    moreInfo = document.getElementById('moreInfo');


let day1 = document.getElementById('day1'),
    day1Date = document.getElementById('day1Date');

let day1Icon = document.getElementById('day1Icon'),
    maxDegree1 = document.getElementById('maxDegree1'),
    minDegree1 = document.getElementById('minDegree1'),
    day1Condition = document.getElementById('day1Condition');

let day2 = document.getElementById('day2'),
    day2Date = document.getElementById('day2Date');

let day2Icon = document.getElementById('day2Icon'),
    maxDegree2 = document.getElementById('maxDegree2'),
    minDegree2 = document.getElementById('minDegree2'),
    day2Condition = document.getElementById('day2Condition');





async function findcity(){

     async function success(position){

        // console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        let x;
        const geoApiUrl = `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=bdc_c52ea5af3ce44c4d9f8eea3426f63010`
        let location = await fetch(geoApiUrl).then(res => res.json()).then(data => {
            x=data;
        })
        
        getData(x.city);

    }
    const error = () => {
        console.log("unable to retrive")
    }

    navigator.geolocation.getCurrentPosition(success, error);

}
findcity();


async function getData(city){
    // 1c47c51c374e4b10a42165133232108
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1c47c51c374e4b10a42165133232108&q=${city}&days=3`);

    if(!res.ok || res.status != 200){
        flagUrl = true;    
    }else{
        if(res.ok || (res.status >= 200 && res.status <= 299)){
            let info =await res.json();
            console.log(info);
            cityName = info.location.name;
            today = info.current;
            days = info.forecast.forecastday;

            displayName(cityName)
            displayToday(today);
            displayDays(day1, day1Date, day1Icon, maxDegree1,minDegree1,day1Condition ,days[1]);
            displayDays(day2, day2Date, day2Icon, maxDegree2,minDegree2, day2Condition,days[2]);
        }
    }
}

var city = document.getElementById('city');
function displayName(name) {
    city.innerHTML = name;
}



function displayToday(Today){
    
    let dd = getDayName(new Date(Today.last_updated.slice(0,10)));
    todayDay.innerHTML = `${dd}`;
    let dateNumbers = Today.last_updated.slice(0,10);
    todayDate.innerHTML = dateNumbers;
    todayDegree.innerHTML= `${Today.temp_c}<sup>o</sup>C`;
    todayCondition.innerHTML = Today.condition.text;
    console.log(Today.condition.icon);
    todayIcon.src = Today.condition.icon;

    moreInfo.innerHTML = `<span><i class="fa-solid fa-water"></i>${Today.humidity}%</span>
    <span><i class="fa-solid fa-wind"></i>${Today.wind_kph}Km/h</span><span><i class="fa-regular fa-compass"> ${Today.wind_dir}</i></span>`;
    
}


function displayDays(theDay, theDate, daysDegreeIcon, max,min, cond,days){
    // console.log(theDay);
    // theDay.innerHTML = dayName(days.date);
    theDay.innerHTML = getDayName(new Date(days.date));
    theDate.innerHTML = days.date;
    daysDegreeIcon.src = days.day.condition.icon;
    max.innerHTML = days.day.maxtemp_c;
    min.innerHTML = days.day.mintemp_c;
    cond.innerHTML = days.day.condition.text;

}




search.addEventListener('keyup', function(){
    let NameRegex = /[a-zA-Z]{3,}/;
    if(NameRegex.test(search.value) && flagUrl == false) {
        getData(search.value);
    }
    flagUrl = false;
})




function getDayName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, {weekday: 'long'});
}



$(window).on("load",function(){
    $(".loader-container").fadeOut(1000,()=>{
        $("#cc").removeClass("op");
    });
    
})