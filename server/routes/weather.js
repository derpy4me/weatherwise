const express = require("express");
const axios = require("axios");
const { owmToIcon } = require("../wmoCodeMapping");

const router = express.Router();

const API_KEY = process.env.OPENWEATHER_API_KEY;

router.get("/geocode", async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ message: "City query parameter (city) is required." });
    }

    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}&lang=en`;

    const response = await axios.get(apiUrl);

    if (response.data.length === 0) {
      return res.status(404).json({ message: `City not found: ${city}` });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in geocoding:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Failed to geocode city." });
  }
});

router.get("/weather", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ message: "Latitude (lat) and Longitude (lon) query parameters are required." });
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      axios.get(currentWeatherUrl),
      axios.get(forecastUrl),
    ]);

    const currentWeather = currentWeatherResponse.data;
    const currentIconDetails = owmToIcon(currentWeather.weather[0].icon);
    currentWeather.weather[0].description = currentIconDetails.description;
    currentWeather.weather[0].icon = currentIconDetails.image;

    const processedForecast = processForecastData(forecastResponse.data);

    const combinedData = {
      current: currentWeatherResponse.data,
      // forecast: forecastResponse.data,
      forecast: processedForecast,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching from OpenWeather APIs:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Failed to fetch weather data from the external service." });
  }
});

function processForecastData(forecastData) {
  const dailyData = forecastData.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = { temp_mins: [], temp_maxes: [], icons: [] };
    }
    acc[date].temp_mins.push(item.main.temp_min);
    acc[date].temp_maxes.push(item.main.temp_max);
    acc[date].icons.push(item.weather[0].icon);
    return acc;
  }, {});

  const processedList = Object.keys(dailyData).map((date) => {
    const dayInfo = dailyData[date];
    const temp_min = Math.min(...dayInfo.temp_mins);
    const temp_max = Math.max(...dayInfo.temp_maxes);
    const representativeIcon = dayInfo.icons[Math.floor(dayInfo.icons.length / 2)] || dayInfo.icons[0];
    const iconDetails = owmToIcon(representativeIcon);
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
    return {
      date: date,
      dayOfWeek: dayOfWeek,
      temp_max: temp_max,
      temp_min: temp_min,
      description: iconDetails.description,
      icon: iconDetails.image,
    };
  });

  const today = new Date().toISOString().split("T")[0];
  if (processedList.length > 5 && processedList[0].date === today) {
    return processedList.slice(1, 6);
  }

  return processedList.slice(0, 5);
}

module.exports = router;
