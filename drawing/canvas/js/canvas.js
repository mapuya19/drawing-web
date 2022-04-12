// Scale
let scale = window.devicePixelRatio;

// Mountain
let canvas = document.querySelector("#c1");
let c = canvas.getContext("2d");

// Sun
class Sun {
  constructor() {
    this.canvas = document.getElementById("c1");
    this.ctx = canvas.getContext("2d");
    this.animation;
    this.size = 50;
    this.increament = 0.01;
    this.count = 0;
    this.color = ["#fdd835"];
    this.currentcolor = this.color;
    window.requestAnimationFrame(this.draw.bind(this));
  }

  draw() {
    this.count = this.count + this.increament;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.currentcolor;
    this.ctx.lineWidth = 50;

    this.ctx.arc(170, 150, 50, 0, this.count * Math.PI);
    this.ctx.stroke();

    if (this.count === 1) {
      cancelAnimationFrame(animation);
    }

    this.animation = window.requestAnimationFrame(this.draw.bind(this));
  }
}

function mountainSetup() {
  canvas.width = Math.floor(600 * scale);
  canvas.height = Math.floor(400 * scale);
  c.scale(scale, scale);
}

function mountainDraw() {
  // Left Mountain
  c.beginPath();
  c.moveTo(-50, 600);
  c.lineTo(350, 80);
  c.lineTo(500, 450);
  c.fillStyle = "#bea49d";
  c.fill();

  // Center Mountain
  c.beginPath();
  c.moveTo(-100, 660);
  c.lineTo(100, 220);
  c.lineTo(550, 400);
  c.fillStyle = "#4d4040";
  c.fill();

  // Tree
  c.beginPath();
  c.moveTo(20, 460);
  c.lineTo(50, 280);
  c.lineTo(100, 500);
  c.fillStyle = "#1b5e20";
  c.fill();

  // Tree
  c.beginPath();
  c.moveTo(40, 460);
  c.lineTo(80, 220);
  c.lineTo(120, 500);
  c.fillStyle = "#8bc34a";
  c.fill();

  // Tree
  c.beginPath();
  c.moveTo(120, 460);
  c.lineTo(150, 360);
  c.lineTo(190, 500);
  c.fillStyle = "#2e7d32";
  c.fill();

  // Tree
  c.beginPath();
  c.moveTo(220, 460);
  c.lineTo(250, 320);
  c.lineTo(290, 500);
  c.fillStyle = "#2e7d32";
  c.fill();

  // Tree
  c.beginPath();
  c.moveTo(420, 440);
  c.lineTo(450, 300);
  c.lineTo(490, 500);
  c.fillStyle = "#1b5e20";
  c.fill();

  // Right Mountain
  c.beginPath();
  c.rotate((-20 * Math.PI) / 180);
  c.rect(-70, 470, 500, 200);
  c.fillStyle = "#d1cfcf";
  c.fill();

  // Tree
  c.beginPath();
  c.arc(-400, 650, 400, 0, Math.PI * 2, false);
  c.fillStyle = "#9ccc65";
  c.fill();

  let sun = new Sun();
}

// Desert
const canvas2 = document.querySelector("#c2");
const ctx2 = canvas2.getContext("2d");

let desertPic = document.querySelector("img");

function desertSetup() {
  canvas2.width = Math.floor(600 * scale);
  canvas2.height = Math.floor(400 * scale);
  ctx2.scale(scale, scale);
}

function desertDraw() {
  ctx2.drawImage(desertPic, 0, 0, 600, 400);

  let imageData = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
  let data = imageData.data;
  console.log(imageData);

  // invert pixels
  for (let i = 0; i < data.length; i += 4) {
    data[i + 0] = 255 - data[i + 0]; // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
  }

  ctx2.putImageData(imageData, 0, 0);
}

// when the whole page has loaded, including all dependent resources
window.addEventListener("load", () => {
  mountainSetup();
  mountainDraw();
  desertSetup();
  desertDraw();
});
