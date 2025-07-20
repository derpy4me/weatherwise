const express = require("express");
const router = express.Router();
const axios = require("axios");
const UserModel = require("../models/User");

API_KEY = process.env.OPENWEATHER_API_KEY;

//Dummy user for early prototype
const DUMMY_USER_NAME = "dummy";

router.get("/locations", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: DUMMY_USER_NAME });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.savedLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/locations", async (req, res) => {
  const { cityId } = req.body;
  if (!cityId) {
    return res.status(400).json({ error: "cityId is required" });
  }
  try {
    let user = await UserModel.findOne({ username: DUMMY_USER_NAME });
    if (!user) {
      user = new UserModel({ username: DUMMY_USER_NAME, savedLocations: [] });
    }
    const alreadyExists = user.savedLocations.some((location) => location === cityId);
    if (alreadyExists) {
      return res.status(400).json({ error: "Location already exists" });
    }
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=imperial`;
    const weatherResponse = await axios.get(weatherUrl);
    const { id, coord } = weatherResponse.data;

    const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${coord.lat}&lon=${coord.lon}&limit=1&appid=${API_KEY}&lang=en`;
    const response = await axios.get(apiUrl);
    const locationDetails = response.data[0];

    const newLocation = {
      cityId: id,
      name: locationDetails.name,
      country: locationDetails.country,
      state: locationDetails.state,
      lat: locationDetails.lat,
      lon: locationDetails.lon,
    };

    user.savedLocations.push(newLocation);
    await user.save();
    res.status(201).json(newLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/locations/:cityId", async (req, res) => {
  const cityId = parseInt(req.params.cityId);
  try {
    const user = await UserModel.findOne({ username: DUMMY_USER_NAME });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.savedLocations.pull({ cityId: cityId });
    await user.save();
    res.json(user.savedLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
