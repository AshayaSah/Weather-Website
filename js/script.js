let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temp = document.querySelector(".weather_temperature");
let w_minTemp = document.querySelector(".weather_min");
let w_maxTemp = document.querySelector(".weather_max");

//geting the actual country name 
const actualCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

//getting the formatted date and time as per the current location eneterd
const getDateTime = (dt) => {
    const currDateTime = new Date(dt*1000);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }

    const formatter = new Intl.DateTimeFormat('en-US',options);
    return formatter.format(currDateTime);
}

const getTempInCelsius = (temp) => {
    return (temp - 273.15).toFixed(2);
}
 
const getWeatherData = async () => {
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=kathmandu&appid=261976157224512c5031d09973b2690df";

    try{
        const res = await fetch(apiURL);
        const data = await res.json();
        
        const {main, dt, sys, weather, name, wind} = data;

        cityName.innerHTML = `${name}, ${actualCountryName(sys.country)}`; 

        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = weather[0].main;

        w_temp.innerHTML = `${getTempInCelsius(main.temp)}&#176`;

        w_minTemp.innerHTML = `${getTempInCelsius(main.temp_min)}&#176`;

        w_maxTemp.innerHTML = `${getTempInCelsius(main.temp_max)}&#176`;

    }catch (error){
        console.log(error);
    }
}

getWeatherData();




