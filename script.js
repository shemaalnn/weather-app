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

//the function carried out when the button is clicked 
function searchWeather() {
    const locationName = cityInputEl.value.trim();
    if (locationName) {
        getCurrentWeather(locationName);
        saveLocation(locationName);
    } else {
        alert("Please enter a location to see the weather");
    }
}

function getCurrentWeather(locationName) {
    var requestUrl =`${WEATHER_API_BASE_URL}/weather?q=${locationName}&units=metric&appid=${WEATHER_API_KEY}`
    fetch(requestUrl)
       .then(response => {
            if (!response.ok) {
                alert Error("Location not found!");
            }
            return response.json();
       })
       .then(data => {
            displayCurrentWeather(data);
            saveLocation(locationName);
       })
       .catch(error => {
            console.error('Error fetching weather:', error);
            alert('Location not found. Please try again');
       });
}
// Displaying current weather 
function displayCurrentWeather(data) {
    currentLocationEl.textContent = data.name 
    tempEl.textContent = `${data.main.temp}°C`;
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${data.wind.speed} m/s`;
    weatherIconEl.querySelector('img').src=`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherEl.style.display = "block";
}

//local storage for saved locations 
function saveLocation(locationName) {
    const pastLocations = JSON.parse(localStorage.getItem())
}

//Saving the locations to local storage 
function saveLocation(locationName) {
    const pastLocations = JSON.parse(localStorage.getItem('pastLocations')) || [];
    if (!pastLocations.includes(locationName)) {
        pastLocations.push(locationName);
        localStorage.setItem('pastLocations', JSON.stringify(pastLocations));
        displayPastLocations();
    }
}
// Displaying past locations from the local storage 
function displayPastLocations() {
    const pastLocations = JSON.parse(localStorage.getItem('pastLocations')) || [];
    pastLocationsEl.innerHTML = '';
    pastLocations.forEach(location => {
        const locationEl = document.createElement('div');
        locationEl.textContent = location;
        locationEl.classList.add('location-item');
        locationEl.addEventListener('click', () => {
            getCurrentWeather(location);
        });
        pastLocationsEl.appendChild(locationEl);
    });
}

// clearing searches from the past locations 
clearSearchEl.addEventListener('click', () => {
    localStorage.removeItem('pastLocations')
    pastLocationsEl.innerHTML = '';
})



//an event listener for the search button to fetch the data when clicked 
searchButtonEl.addEventListener('click', searchWeather)