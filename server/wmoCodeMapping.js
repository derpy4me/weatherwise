const wmoMapping = {
  0: {
    day: { description: "Sunny", image: "https://openweathermap.org/img/wn/01d@2x.png" },
    night: { description: "Clear", image: "https://openweathermap.org/img/wn/01n@2x.png" },
  },
  1: {
    day: { description: "Mainly Sunny", image: "https://openweathermap.org/img/wn/01d@2x.png" },
    night: { description: "Mainly Clear", image: "https://openweathermap.org/img/wn/01n@2x.png" },
  },
  2: {
    day: { description: "Partly Cloudy", image: "https://openweathermap.org/img/wn/02d@2x.png" },
    night: { description: "Partly Cloudy", image: "https://openweathermap.org/img/wn/02n@2x.png" },
  },
  3: {
    day: { description: "Cloudy", image: "https://openweathermap.org/img/wn/03d@2x.png" },
    night: { description: "Cloudy", image: "https://openweathermap.org/img/wn/03n@2x.png" },
  },
  45: {
    day: { description: "Foggy", image: "https://openweathermap.org/img/wn/50d@2x.png" },
    night: { description: "Foggy", image: "https://openweathermap.org/img/wn/50n@2x.png" },
  },
  48: {
    day: { description: "Rime Fog", image: "https://openweathermap.org/img/wn/50d@2x.png" },
    night: { description: "Rime Fog", image: "https://openweathermap.org/img/wn/50n@2x.png" },
  },
  51: {
    day: { description: "Light Drizzle", image: "https://openweathermap.org/img/wn/09d@2x.png" },
    night: { description: "Light Drizzle", image: "https://openweathermap.org/img/wn/09n@2x.png" },
  },
  53: {
    day: { description: "Drizzle", image: "https://openweathermap.org/img/wn/09d@2x.png" },
    night: { description: "Drizzle", image: "https://openweathermap.org/img/wn/09n@2x.png" },
  },
  55: {
    day: { description: "Heavy Drizzle", image: "https://openweathermap.org/img/wn/09d@2x.png" },
    night: { description: "Heavy Drizzle", image: "https://openweathermap.org/img/wn/09n@2x.png" },
  },
  56: {
    day: { description: "Light Freezing Drizzle", image: "https://openweathermap.org/img/wn/09d@2x.png" },
    night: { description: "Light Freezing Drizzle", image: "https://openweathermap.org/img/wn/09n@2x.png" },
  },
  57: {
    day: { description: "Freezing Drizzle", image: "https://openweathermap.org/img/wn/09d@2x.png" },
    night: { description: "Freezing Drizzle", image: "https://openweathermap.org/img/wn/09n@2x.png" },
  },
  61: {
    day: { description: "Light Rain", image: "https://openweathermap.org/img/wn/10d@2x.png" },
    night: { description: "Light Rain", image: "https://openweathermap.org/img/wn/10n@2x.png" },
  },
  63: {
    day: { description: "Rain", image: "https://openweathermap.org/img/wn/10d@2x.png" },
    night: { description: "Rain", image: "https://openweathermap.org/img/wn/10n@2x.png" },
  },
  65: {
    day: { description: "Heavy Rain", image: "https://openweathermap.org/img/wn/10d@2x.png" },
    night: { description: "Heavy Rain", image: "https://openweathermap.org/img/wn/10n@2x.png" },
  },
  66: {
    day: { description: "Light Freezing Rain", image: "https://openweathermap.org/img/wn/10d@2x.png" },
    night: { description: "Light Freezing Rain", image: "https://openweathermap.org/img/wn/10n@2x.png" },
  },
  67: {
    day: { description: "Freezing Rain", image: "https://openweathermap.org/img/wn/10d@2x.png" },
    night: { description: "Freezing Rain", image: "https://openweathermap.org/img/wn/10n@2x.png" },
  },
  71: {
    day: { description: "Light Snow", image: "https://openweathermap.org/img/wn/13d@2x.png" },
    night: { description: "Light Snow", image: "https://openweathermap.org/img/wn/13n@2x.png" },
  },
  73: {
    day: { description: "Snow", image: "https://openweathermap.org/img/wn/13d@2x.png" },
    night: { description: "Snow", image: "https://openweathermap.org/img/wn/13n@2x.png" },
  },
  75: {
    day: { description: "Heavy Snow", image: "https://openweathermap.org/img/wn/13d@2x.png" },
    night: { description: "Heavy Snow", image: "https://openweathermap.org/img/wn/13n@2x.png" },
  },
  77: {
    day: { description: "Snow Grains", image: "https://openweathermap.org/img/wn/13d@2x.png" },
    night: { description: "Snow Grains", image: "https://openweathermap.org/img/wn/13n@2x.png" },
  },
  80: {
    day: { description: "Light Showers", image: "https://openweathermap.org/img/wn/09d@2x.png" },
    night: { description: "Light Showers", image: "https://openweathermap.org/img/wn/09n@2x.png" },
  },
  81: {
    day: { description: "Showers", image: "https://openweathermap.org/img/wn/09d@2x.png" },
    night: { description: "Showers", image: "https://openweathermap.org/img/wn/09n@2x.png" },
  },
  82: {
    day: { description: "Heavy Showers", image: "https://openweathermap.org/img/wn/09d@2x.png" },
    night: { description: "Heavy Showers", image: "https://openweathermap.org/img/wn/09n@2x.png" },
  },
  85: {
    day: { description: "Light Snow Showers", image: "https://openweathermap.org/img/wn/13d@2x.png" },
    night: { description: "Light Snow Showers", image: "https://openweathermap.org/img/wn/13n@2x.png" },
  },
  86: {
    day: { description: "Snow Showers", image: "https://openweathermap.org/img/wn/13d@2x.png" },
    night: { description: "Snow Showers", image: "https://openweathermap.org/img/wn/13n@2x.png" },
  },
  95: {
    day: { description: "Thunderstorm", image: "https://openweathermap.org/img/wn/11d@2x.png" },
    night: { description: "Thunderstorm", image: "https://openweathermap.org/img/wn/11n@2x.png" },
  },
  96: {
    day: { description: "Light Thunderstorms With Hail", image: "https://openweathermap.org/img/wn/11d@2x.png" },
    night: { description: "Light Thunderstorms With Hail", image: "https://openweathermap.org/img/wn/11n@2x.png" },
  },
  99: {
    day: { description: "Thunderstorm With Hail", image: "https://openweathermap.org/img/wn/11d@2x.png" },
    night: { description: "Thunderstorm With Hail", image: "https://openweathermap.org/img/wn/11n@2x.png" },
  },
};

const owmToWmoMap = {
  "01d": "0",
  "01n": "0",
  "02d": "2",
  "02n": "2",
  "03d": "3",
  "03n": "3",
  "04d": "3",
  "04n": "3",
  "50d": "48",
  "50n": "48",
  "09d": "82",
  "09n": "82",
  "10d": "67",
  "10n": "67",
  "13d": "86",
  "13n": "86",
  "11d": "99",
  "11n": "99",
};

function owmToIcon(owmCode) {
  const wmoCode = owmToWmoMap[owmCode];

  if (!wmoCode) {
    return { description: "Unknown", image: "https://openweathermap.org/img/wn/50d@2x.png" };
  }

  const time = owmCode.includes("n") ? "night" : "day";
  const mapping = wmoMapping[wmoCode];

  if (!mapping || !mapping[time]) {
    return { description: "Unknown", image: "https://openweathermap.org/img/wn/50d@2x.png" };
  }

  return mapping[time];
}

module.exports = { owmToIcon };
