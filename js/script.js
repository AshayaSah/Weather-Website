//Body content references
let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temp = document.querySelector(".weather_temperature");
let w_minTemp = document.querySelector(".weather_min");
let w_maxTemp = document.querySelector(".weather_max");

//Extra details references
let feels_like = document.querySelector(".feels_like");
let humidity = document.querySelector(".humidity");
let w_wind = document.querySelector(".wind");
let pressure = document.querySelector(".pressure");

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

//function ot get the temperature in celsius
const getTempInCelsius = (temp) => {
    return (temp - 273.15).toFixed(2);
}
 
const getWeatherData = async () => {
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=kathmandu&appid=261976157224512c5031d09973b2690df";

    try{
        const res = await fetch(apiURL);
        const data = await res.json();
        
        const {main, dt, sys, weather, name, wind} = data;

        //display city name
        cityName.innerHTML = `${name}, ${actualCountryName(sys.country)}`; 

        //display date and time
        dateTime.innerHTML = getDateTime(dt);

        //displays the weather condition
        w_forecast.innerHTML = weather[0].main;
        
        //shows the relative icon
        w_icon.innerHTML = `<img src = "https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"/>`

        //displays the current temperature
        w_temp.innerHTML = `${getTempInCelsius(main.temp)}&#176`;

        //displays the minimum temperature
        w_minTemp.innerHTML = `Min: ${getTempInCelsius(main.temp_min)}&#176`;

        //displays the maximum temperature
        w_maxTemp.innerHTML = `Max: ${getTempInCelsius(main.temp_max)}&#176`;
        
        //displays the extra details
        feels_like.innerHTML = `${getTempInCelsius(main.feels_like)}&#176`;
        humidity.innerHTML = `${main.humidity} %`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        pressure.innerHTML = `${main.pressure} Pa`;

    }catch (error){
        console.log(error);
    }
}

getWeatherData();




