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

app.get("/api/weather", async (req, res) => {
  try {
    res.status(200).json({ message: "Weather data fetched successfully" });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ message: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
