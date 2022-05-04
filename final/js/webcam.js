const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const filterBtn = [...document.querySelectorAll(".filter")];
let interval;

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => console.error("Oops"));
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  clearInterval(interval);

  return (interval = setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = rgbSplit(pixels);

    ctx.putImageData(pixels, 0, 0);
  }, 16));
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 500] = pixels.data[i + 0]; // RED
    pixels.data[i + 100] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 100] = pixels.data[i + 2]; // Blue
  }

  return pixels;
}

getVideo();
video.addEventListener("canplay", paintToCanvas);
filterBtn.map((node) => node.addEventListener("click", paintToCanvas));

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

playAudio("assets/zoom.mp3", 0);

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
