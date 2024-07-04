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
        getWeatherForecast(locationName)
        saveLocation(locationName);
    } else {
        alert("Please enter a location to see the weather");
    }
}

function getCurrentWeather(locationName) {
    var requestUrl =`${WEATHER_API_BASE_URL}/data/2.5/weather?q=${locationName}&units=metric&appid=${WEATHER_API_KEY}`
    fetch(requestUrl)
       .then(response => {
            if (!response.ok) {
                throw new Error("Location not found!");
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

// Fetching the 5-Day weather forecast 
function getWeatherForecast(locationName) {
    var requestUrl = `${WEATHER_API_BASE_URL}/data/2.5/forecast?q=${locationName}&units=metric&appid=${WEATHER_API_KEY}`;
    fetch (requestUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Location not found!");
            }
            return response.json();
        })
        .then(data => {
            displayWeatherForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
        })
}
// Displaying current weather 
function displayCurrentWeather(data) {
    currentLocationEl.textContent = data.name 
    tempEl.textContent = `${data.main.temp}°C`;
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${data.wind.speed} m/s`;
    weatherIconEl.querySelector('img').src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherEl.style.display = "block";
}

// Displaying the weather forecast 
function displayWeatherForecast(data) {
    forecastEl.style.display = "block";
    forecastDaysEl.innerHTML = '';

    const dailyForecast = data.list.filter(entry => entry.dt_txt.includes("12:00:00")).slice(0, MAX_DAILY_FORECAST);

    dailyForecast.forEach(forecast  => {
        const forecastEl = document.createElement('div');
        forecastEl.classList.add('forecast-day');

        const dateEl = document.createElement('div');
        dateEl.classList.add('date');
        dateEl.textContent = formatDate(forecast.dt_txt);

        const iconEl = document.createElement('img');
        iconEl.classList.add('forecast-icon');
        iconEl.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        iconEl.alt = forecast.weather[0].description;

        const tempEl = document.createElement('div');
        tempEl.classList.add('temp');
        tempEl.textContent = `Temp: ${forecast.main.temp}°C`

        const windEl = document.createElement('div');
        windEl.classList.add('wind');
        windEl.textContent = `Wind: ${forecast.wind.speed} m/s`;

        const humidityEl = document.createElement('div');
        humidityEl.classList.add('humidity');
        humidityEl.textContent = `Humidity: ${forecast.main.humidity}%`;

        forecastEl.appendChild(dateEl);
        forecastEl.appendChild(iconEl);
        forecastEl.appendChild(tempEl);
        forecastEl.appendChild(windEl);
        forecastEl.appendChild(humidityEl);

        forecastDaysEl.appendChild(forecastEl);
    })
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
}

//Saving the locations to local storage 
function saveLocation(locationName) {
    var pastLocations = JSON.parse(localStorage.getItem('pastLocations')) || [];
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

// initial call to display past locations when page loads 
displayPastLocations();