import {displayWeather, showWeatherForecast} from "./weatherDisplay";
import {loadHeaderFooter} from "./utils.mjs";
import {getLocation} from "./geolocationHandler";
import {initCitySearch} from "./search";


loadHeaderFooter();
getLocation();
displayWeather();
showWeatherForecast();
document.addEventListener("DOMContentLoaded", () => {
  initCitySearch();
});
