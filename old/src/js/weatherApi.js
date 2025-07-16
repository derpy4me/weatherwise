import {generateHash, getSessionCache, setSessionCache} from "./utils.mjs";

const OpenWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const OpenWeatherUrl = import.meta.env.VITE_OPEN_WEATHER_URL;
const OpenMeteoUrl = import.meta.env.VITE_OPEN_METEO_URL;
const OpenMeteoArchiveUrl = import.meta.env.VITE_OPEN_METEO_ARCHIVE_URL;
const OpenMeteoSearchUrl = import.meta.env.VITE_OPEN_METEO_GEOSEARCH_URL;


async function handleCaching(url, requestOptions, ttl = 60) {
  const cachedData = getSessionCache(url);
  if (cachedData) {
    return cachedData;
  }
  const key = await generateHash(url);
  return fetch(url, requestOptions).then(async (response) => {
    const jsonResponse = await response.json();
    setSessionCache(key, jsonResponse, ttl);
    return jsonResponse;
  }).catch((error) => {
    console.error(error);
    return null;
  });
}

export async function getWeatherForecast(lat, lon, days = 5) {
  const requestOptions = {
    method: "GET", redirect: "follow"
  };

  const url = `${OpenWeatherUrl}/forecast?lat=${lat}&lon=${lon}&cnt=${days}&units=imperial&appid=${OpenWeatherApiKey}`;

  return await handleCaching(url, requestOptions, 180);
}

export async function getWeatherHistoricDataHourly(lat, lon, startDate, endDate) {
  const requestOptions = {
    method: "GET", redirect: "follow"
  };

  const url = `${OpenMeteoArchiveUrl}/archive?latitude=52.52&longitude=13.41&start_date=2022-07-01&end_date=2022-07-01&hourly=temperature_2m&temperature_unit=fahrenheit&wind_speed_unit=mph`;

  const response = await fetch(url, requestOptions);
  return response.json();
}

export async function getDailyForecast(lat, lon, days) {
  const requestOptions = {
    method: "GET", redirect: "follow"
  };

  const url = `${OpenMeteoUrl}/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=auto&forecast_days=${days}`;

  return await handleCaching(url, requestOptions, 180);
}

export async function getCurrentWeather(lat, lon) {
  const requestOptions = {
    method: "GET", redirect: "follow",
  };
  const url = `${OpenWeatherUrl}/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${OpenWeatherApiKey}`;

  return await handleCaching(url, requestOptions);
}

export async function searchCity(search) {
  const requestOptions = {
    method: "GET", redirect: "follow",
  };

  const urlEncodedSearch = encodeURI(search);
  const url = `${OpenMeteoSearchUrl}/search?name=${urlEncodedSearch}&count=5&language=en&format=json`;

  return await fetch(url, requestOptions).then(async (response) => {
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  }).catch((error) => {
    console.log(error);
    return {result: []};
  });
}
