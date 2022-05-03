getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Unable to determine location.");
  }
};

showPosition = (position) => {
  let lat = position.coords.latitude;
  //   console.log(lat);
  let lon = position.coords.longitude;
  //   console.log(lon);

  accessData(lat, lon);
};

accessData = async (lat, lon) => {
  let url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&APPID=f551a87996a9d9897fdb146ea1729721";

  let response = await fetch(url);

  if (response.ok) {
    let json = await response.json();
    weatherData(json);
    // console.log(json);
  } else {
    console.log("Error: " + response.status);
  }
};

weatherData = (response) => {
  let main = response.weather[0].main;
  // main = "rain";
  // console.log("This is the main: " + main);

  if (main === "rain") {
    playAudio("assets/rain.mp3", 0);
  } else {
    playAudio("assets/fly.mp3", 0);
  }
};

window.addEventListener("load", getLocation);

$("#volume").slider({
  min: 0,
  max: 100,
  value: 0,
  range: "min",
  slide: function (event, ui) {
    setVolume(ui.value / 100);
  },
});

var myMedia = document.createElement("audio");
$("#player").append(myMedia);
myMedia.id = "myMedia";

function playAudio(fileName, myVolume) {
  myMedia.src = fileName;
  myMedia.setAttribute("loop", "loop");
  setVolume(myVolume);
  myMedia.play();
}

function setVolume(myVolume) {
  var myMedia = document.getElementById("myMedia");
  myMedia.volume = myVolume;
}
