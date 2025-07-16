import {getSessionStorage, renderListWithTemplate, renderWithTemplate} from "./utils.mjs";
import {getCurrentWeather, getDailyForecast} from "./weatherApi";
import {meteoToIcon, owmToIcon} from "./wmoCodeMapping";

function locationInfoTemplate(locationDetails, currentWeatherDetails) {
  return async function () {
    return `<h2 class="cityName">${locationDetails.city}</h2>
<h3>Lat: ${locationDetails.lat}, Lon: ${locationDetails.lon}</h3>
<img class="currentWeatherIcon" src="${currentWeatherDetails.icon.image}" alt="${currentWeatherDetails.icon.description}">
<p class="weatherDetails">
  <span>${currentWeatherDetails.icon.description}</span><br>
  Temperature: ${currentWeatherDetails.temp}°F<br>
  Humidity: ${currentWeatherDetails.humidity}%<br>
  Wind Speed: ${currentWeatherDetails.windSpeed} mph
</p>`;
  };

}

async function getForecast() {
  const latLon = getSessionStorage("geoLoc");
  return await getDailyForecast(latLon.lat, latLon.lon, 16);
}

async function getWeather() {
  const latLon = getSessionStorage("geoLoc");
  return await getCurrentWeather(latLon.lat, latLon.lon);
}


function weatherCardTemplate(weatherDetails) {
  return `<div class="forecastCard ${weatherDetails.icon.css}">
  <div class="forecastDate">${weatherDetails.time}</div>
  <img class="forecastIcon" src="${weatherDetails.icon.image}" alt="${weatherDetails.icon.description}">
  <div class="forecastDescription">${weatherDetails.icon.description}</div>
  <div class="forecastTemps">
    <span class="tempHigh">${weatherDetails.tempMax}°F</span> /
    <span class="tempLow">${weatherDetails.tempMin}°F</span>
  </div>
</div>`;

}

function cleanDailyForecastData(forecastData) {
  const times = forecastData.daily.time;
  const tempMax = forecastData.daily.temperature_2m_max;
  const tempMin = forecastData.daily.temperature_2m_min;
  const codes = forecastData.daily.weathercode;
  return times.map((v, i) => (
    {
      time: new Date(times[i]).toDateString(),
      tempMax: tempMax[i],
      tempMin: tempMin[i],
      icon: meteoToIcon(codes[i]),
    }));
}


export async function showWeatherForecast(weatherDetails, days = 5) {
  const forecast = await getForecast();
  const cleanData = cleanDailyForecastData(forecast);
  const cardParent = document.querySelector(".forecastContainer");
  await renderListWithTemplate(weatherCardTemplate, cardParent, cleanData);
}

async function setLocationCurrentDetails(locationDetails, weatherDetails) {
  const weatherInfoEl = document.querySelector(".weatherInfo");
  weatherInfoEl.classList.add(weatherDetails.icon.css);
  const templateFn = locationInfoTemplate(locationDetails, weatherDetails);
  await renderWithTemplate(templateFn, weatherInfoEl);
}

export async function displayWeather() {
  const forecast = await getWeather();
  const locationData = {city: forecast.name, lat: forecast.coord.lat, lon: forecast.coord.lon};
  const weatherDetails = forecast.weather[0];
  const weatherData = {
    icon: owmToIcon(weatherDetails.icon),
    temp: forecast.main.temp,
    humidity: forecast.main.humidity,
    windSpeed: forecast.wind.speed
  };
  await setLocationCurrentDetails(locationData, weatherData);
}
