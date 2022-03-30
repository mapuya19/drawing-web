getLocation = () => {
  if (navigator.geolocation) {
    document.querySelector("#direction").textContent =
      "Attempting to access . . . ";
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.querySelector("#direction").textContent = "Unable to determine";
  }
};

showPosition = (position) => {
  let lat = position.coords.latitude;
  // console.log(lat);
  let lon = position.coords.longitude;
  // console.log(lon);

  // call function with coordinates
  accessData(lat, lon);
};

accessData = async (lat, lon) => {
  let url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly,daily,alerts&APPID=f551a87996a9d9897fdb146ea1729721";

  let response = await fetch(url);

  if (response.ok) {
    let json = await response.json();
    // console.log(json);
    weatherData(json);
  } else {
    console.log("Error: " + response.status);
  }
};

weatherData = (response) => {
  document.querySelector('#direction').textContent = "Connected!";

  let test = response.current.visibility / 1000;
  console.log(test);
  let transformStyle =
    "text-shadow: 0 0 " + test + "px white; color: transparent)";
  document.querySelector("body").style.transform = transformStyle;
};

window.addEventListener("load", getLocation);
