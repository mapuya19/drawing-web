console.clear();

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
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => console.error("Oops"));
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  let filterType = this.dataset.filter || 0;
  console.log(this.dataset, "hi", filterType);

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
