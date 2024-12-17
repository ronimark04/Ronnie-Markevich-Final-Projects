const API_KEY = "68e9bb91f8c475bbe5b4d410840bb84d";
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;

const query = document.getElementById("inputCity");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const button = document.querySelector("button");
const description = document.getElementById("description");
const img = document.querySelector("img");
const errorMessage = document.getElementById("errorMessage");
const weatherContainer = document.getElementById("weatherInfo");

async function getWeather(city) {
    try {
        const response = await fetch(URL + city);
        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        console.error(error);
    }
}
// getWeather('tel aviv')

function displayWeather(weatherData) {
    if (weatherData.cod === 200) {
        weatherContainer.style.display = "flex";
        errorMessage.innerText = "";
        city.innerText = query.value;

        let descriptionString = weatherData.weather[0].description;
        let firstLetter = descriptionString.charAt(0).toUpperCase();
        description.innerText = firstLetter + descriptionString.substring(1);

        temp.innerText = Math.floor(weatherData.main.temp) + "°C";
        img.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    } else {
        errorMessage.innerText = "City not found!";
        city.innerText = "";
        description.innerText = "";
        temp.innerText = "";
        img.src = "";
    }
}

query.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        getWeather(query.value);
    }
});

button.addEventListener("click", () => {
    getWeather(query.value);
});