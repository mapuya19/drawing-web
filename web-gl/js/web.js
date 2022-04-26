// canvas for stars
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return min + Math.random() * (max + 1 - min);
}

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars();
});

function stars() {
  const canvasSize = canvas.width * canvas.height;
  const starsFraction = canvasSize / 2000;

  for(let i = 0; i < starsFraction; i++) {
    let xPos = random(2, canvas.width - 2);
    let yPos = random(2, canvas.height - 2);
    let alpha = random(0.5, 1);
    let size = random(1, 2);

    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = alpha;
    ctx.fillRect(xPos, yPos, size, size);
  }
}

stars();

// three.js scene
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 10;

let renderer = new THREE.WebGLRenderer({
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// add lighting
let light, shadowLight, backLight;

function createLights() {
  light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.8);

  shadowLight = new THREE.DirectionalLight(0xffffff, 0.3);
  shadowLight.position.set(200, 200, 200);
  shadowLight.castShadow = true;
  shadowLight.shadowDarkness = 0.7;

  backLight = new THREE.DirectionalLight(0xffffff, 0.2);
  backLight.position.set(-100, 200, 50);
  backLight.shadowDarkness = 0.1;
  backLight.castShadow = true;

  // scene.add(backLight);
  scene.add(light);
  scene.add(shadowLight);
}

// create eye
let eye;

function createEye(posX) {
  eye = new Eye(posX);
  scene.add(eye.threegroup);
}

Eye = function (posX) {
  this.threegroup = new THREE.Group();

  var whiteMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.SmoothShading,
  });

  var rainbowMaterial = new THREE.MeshNormalMaterial({
    color: 0x338888,
  });
  
  var blackMaterial = new THREE.MeshPhongMaterial({
    color: 0x111111,
  });

  this.xRot = 0;
  this.yRot = 0;

  var eyeballGeom = new THREE.SphereGeometry(2, 16, 16);
  this.eyeball = new THREE.Mesh(eyeballGeom, whiteMaterial);
  this.eyeball.position.x = posX;
  this.eyeball.position.y = 0;
  this.eyeball.position.z = 0;

  this.eyeInner = new THREE.Group();

  var irisGeom = new THREE.SphereGeometry(1, 16, 8);
  this.iris = new THREE.Mesh(irisGeom, rainbowMaterial);
  this.iris.position.x = 0;
  this.iris.position.y = 0;
  this.iris.position.z = 1.9;
  this.iris.scale.y = 0.1;
  this.iris.rotation.x = Math.PI / 2;

  var pupilGeom = new THREE.SphereGeometry(0.6, 16, 4);
  this.pupil = new THREE.Mesh(pupilGeom, blackMaterial);
  this.pupil.position.x = 0;
  this.pupil.position.y = 0;
  this.pupil.position.z = 1.95;
  this.pupil.scale.y = 0.2;
  this.pupil.rotation.x = Math.PI / 2;

  this.eyeInner.add(this.iris);
  this.eyeInner.add(this.pupil);

  this.eyeball.add(this.eyeInner);

  this.threegroup.add(this.eyeball);
};

Eye.prototype.lookAt = function (x, y) {
  if (Math.abs(x) > 200) x = (x / Math.abs(x)) * 200;
  var yr = (x / 200) * Math.PI * 0.2;
  eye.yRot = yr;

  if (Math.abs(y) > 200) y = (y / Math.abs(y)) * 200;
  var xr = (y / 200) * Math.PI * 0.2;
  eye.xRot = xr;

  eye.update();
};

Eye.prototype.update = function () {
  this.eyeball.rotation.x += (this.xRot - this.eyeball.rotation.x) / 20;
  this.eyeball.rotation.y += (this.yRot - this.eyeball.rotation.y) / 20;

  this.pupil.position.x += (this.yRot * 0.8 - this.pupil.position.x) / 20;
  this.pupil.position.y += (this.xRot * -0.8 - this.pupil.position.y) / 20;
};

createLights();
createEye(0);

let mousePos = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

let loop = function () {
  let posX = mousePos.x - window.innerWidth / 2;
  let posY = mousePos.y - window.innerHeight / 2;
  eye.lookAt(posX, posY);

  requestAnimationFrame(loop);

  renderer.render(scene, camera);
};

loop();

// mouse move
document.body.addEventListener("mousemove", mouseMove);

function mouseMove(event) {
  event.preventDefault();

  mousePos = {
    x: event.clientX,
    y: event.clientY,
  };
}
