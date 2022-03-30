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
  console.log(lat);
  let lon = position.coords.longitude;
  console.log(lon);

  // call function with coordinates
  accessData(lat, lon);
};

accessData = async (lat, lon) => {
  let url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly,daily,alerts&units=metric&APPID=f551a87996a9d9897fdb146ea1729721";

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
  document.querySelector('#direction').textContent = "";

  let vis = response.current.clouds;
  console.log(vis);
  let textShadowStyle = "0 0 " + vis + "px white";

  let temp = response.current.temp;
  console.log(temp);
  let backgroundStyle = "";

  // Calculate RGB values
  const maxTemp = 100;
  const minTemp = 0;

  const blueVal = 255 / (maxTemp - minTemp) * (maxTemp - temp);
  const redVal = 255 / (maxTemp - minTemp) * (temp - minTemp);
  
  if (temp < 0) {
    backgroundStyle = `linear-gradient(-45deg, rgb(${redVal}, 0, ${blueVal}), #23a6d5, #23d5ab)`;   
  } else {
    backgroundStyle = `linear-gradient(-45deg, #ee7752, rgb(${redVal}, 0, ${blueVal}), #23d5ab)`;
  }
  

  document.querySelector("#change-me").style.textShadow = textShadowStyle;
  document.querySelector("body").style.background = backgroundStyle;
  document.querySelector("body").style.backgroundSize = "400% 400%";
  document.querySelector("body").style.animation = "gradient 15s ease infinite;";
  document.querySelector("body").style.height = "100vh;";
  document.querySelector("body").style.fontFamily = "font-family: 'Roboto', sans-serif;";
  document.querySelector("body").style.color = "white";
};

window.addEventListener("load", getLocation);
