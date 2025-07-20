require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("morgan");
const userRoutes = require("./routes/user");
const weatherRoutes = require("./routes/weather");

const app = express();
app.use(logger("dev"));
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

if (!process.env.OPENWEATHER_API_KEY) {
  console.error("FATAL ERROR: OPENWEATHER_API_KEY is not set");
  process.exit(1);
}
if (!process.env.DB_URL) {
  console.error("FATAL ERROR: DB_URL is not set");
  process.exit(1);
}

API_KEY = process.env.OPENWEATHER_API_KEY;
DB_URL = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (err) {
    console.error("MongoDB connection error: ", err.message);
    process.exit(1);
  }
};

connectDB();

app.use("/api", weatherRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
