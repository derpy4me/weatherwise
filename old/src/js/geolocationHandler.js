export function getLocation() {
  const options = {
    enableHighAccuracy: true,
    maximumAge: 60,
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {
    // Geolocation is not available
    console.log("Geolocation is not supported.");
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    // Use the location data
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy}`);
    sessionStorage.setItem("geoLoc", JSON.stringify({lat: latitude, lon: longitude}));
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
}
