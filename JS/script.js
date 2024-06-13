let temp1 = document.getElementById('temp1');
let status1=document.getElementById('status1');
let status2=document.getElementById('status2');
let status3=document.getElementById('status3');
let temp2Max=document.getElementById('temp2Max');
let temp2Min=document.getElementById('temp2Min');
let temp3Max=document.getElementById('temp3Max');
let temp3Min=document.getElementById('temp3Min');
let rain=document.getElementById('rain');
let wind=document.getElementById('wind');
let humidity=document.getElementById('humidity');
let city=document.getElementById('city');
let feen=document.getElementById('feen');
let day1=document.getElementById('day1');
let day2=document.getElementById('day2');
let day3=document.getElementById('day3');
let makan=[];
let weather = [];

async function getWeather() {
    try {
        let newcity=city.value;
        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=2b9ba31cd79c4ed7b34155549241306&q=${newcity}&days=3&aqi=no&alerts=no`);
        let data = await response.json();
        weather = data.forecast.forecastday;
        makan=data.location.name;
        displayWeather();
    } catch (error) {
        console.error(error);
        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=2b9ba31cd79c4ed7b34155549241306&q=cairo&days=3&aqi=no&alerts=no`);
        let data = await response.json();
        weather = data.forecast.forecastday;
        makan=data.location.name;
        // console.log(weather);

        displayWeather();
    }

}


async function displayWeather() {
var date1 = new Date(weather[0].date);
var date2 = new Date(weather[1].date);
var date3 = new Date(weather[2].date);

var dayOfWeek1 = date1.getDay();
var dayOfWeek2 = date2.getDay();
var dayOfWeek3 = date3.getDay();

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var dayName1 = days[dayOfWeek1];
var dayName2 = days[dayOfWeek2];
var dayName3 = days[dayOfWeek3];
day1.innerHTML=dayName1;
day2.innerHTML=dayName2;
day3.innerHTML=dayName3;

    if (weather.length > 0) {
        temp1.innerHTML = weather[0].day.maxtemp_c+'&deg;C';
        status1.innerHTML=`${weather[0].day.condition.text} 
        <img src=http:${weather[0].day.condition.icon} alt="day1">`;
        status2.innerHTML=`<img src=http:${weather[1].day.condition.icon} alt="day2">
        ${weather[1].day.condition.text}`;
        status3.innerHTML=`<img src=http:${weather[2].day.condition.icon} alt="day3">
        ${weather[2].day.condition.text}`;
        temp2Max.innerHTML=weather[1].day.maxtemp_c+'&deg;C';
        temp3Max.innerHTML=weather[2].day.maxtemp_c+'&deg;C';
        temp2Min.innerHTML=weather[1].day.mintemp_c+'&deg;C';
        temp3Min.innerHTML=weather[2].day.mintemp_c+'&deg;C';
        rain.innerHTML=weather[0].day.daily_chance_of_rain+'%';
        wind.innerHTML=weather[0].day.maxwind_kph+'km/hr';
        humidity.innerHTML=weather[0].day.avghumidity;
        feen.innerHTML=makan;
        
    } else {
        temp1.innerHTML = 'Weather data not available';
    }
}

getWeather();
