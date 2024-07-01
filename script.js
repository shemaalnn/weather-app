const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';
const MAX_DAILY_FORECAST = 5;

var appEl = document.getElementById("app");
var cityInputEl = document.getElementById("cityInput");
var searchButtonEl = document.getElementById("searchButton");
var weatherDataEl = document.getElementById("weatherData");
var pastLocationsEl = document.getElementById("pastLocations");
var clearSearchEl = document.getElementById("clearSearch");
var weatherEl = document.getElementById("weather");
var currentLocationEl = document.getElementById("currentLocation");
var weatherIconEl = document.getElementById("weatherIcon");
var weatherInfoEl = document.getElementById("weatherInfo");
var tempEl = document.getElementById("temp");
var humidityEl = document.getElementById("humidity");
var windEl = document.getElementById("wind");
var forecastEl = document.getElementById("forecast");
var forecastDaysEl = document.getElementById("forecast-days");

// Hides the forecast section
forecastEl.style.display = "none";

function searchWeather() {
    const locationName = cityInputEl.value.trim();
    if (locationName) {
        getCurrentWeather(locationName);
        saveLocation(locationName);
    } else {
        alert("Please enter a location to see the weather");
    }
}

//local storage for saved locations 
function saveLocation(locationName) {
    const pastLocations = JSON.parse(localStorage.getItem())
}


//an event listener for the search button to fetch the data when clicked 
searchButtonEl.addEventListener('click', searchWeather)