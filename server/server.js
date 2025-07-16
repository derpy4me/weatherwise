require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

if (!process.env.OPENWEATHER_API_KEY) {
  console.error("FATAL ERROR: OPENWEATHER_API_KEY is not set");
  process.exit(1);
}

API_KEY = process.env.OPENWEATHER_API_KEY;

// TODO: move these to their own routes files

app.get("/", (req, res) => {
  res.send("WeatherWise Express Server is running!");
});

app.get("/api/geocode", async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ message: "City query parameter (city) is required." });
    }

    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}&lang=en`;

    const response = await axios.get(apiUrl);

    if (response.data.length === 0) {
      return res.status(404).json({ message: `City not found: ${city}` });
    }

    res.status(200).json(response.data[0]);
  } catch (error) {
    console.error("Error in geocoding:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Failed to geocode city." });
  }
});

app.get("/api/weather", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ message: "Latitude (lat) and Longitude (lon) query parameters are required." });
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      axios.get(currentWeatherUrl),
      axios.get(forecastUrl),
    ]);
    const combinedData = {
      current: currentWeatherResponse.data,
      forecast: forecastResponse.data,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching from OpenWeather APIs:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Failed to fetch weather data from the external service." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
