const keyboard = document.querySelector("#alice");

let movement = [
  { transform: "skew(-50deg, -50deg" },
  { transform: "skew(50deg, 50deg" },
];

let keebTiming = { duration: 2000, iterations: Infinity };
let keyboarder = keyboard.animate(movement, keebTiming);

startAnimation = () => keyboarder.play();
stopAnimation = () => keyboarder.pause();
reverseAnimation = () => keyboarder.reverse();

document
  .querySelectorAll("button")[0]
  .addEventListener("click", startAnimation);
document.querySelectorAll("button")[1].addEventListener("click", stopAnimation);
document
  .querySelectorAll("button")[2]
  .addEventListener("click", reverseAnimation);
