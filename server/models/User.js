const mongoose = require("mongoose");

const SavedLocationSchema = new mongoose.Schema(
  {
    cityId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  // No authentication at this point, but can be added later
  username: {
    type: String,
    required: true,
    unique: true,
  },
  savedLocations: [SavedLocationSchema],
});

module.exports = mongoose.model("User", UserSchema);
