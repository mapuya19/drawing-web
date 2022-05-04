// typing effect
let textLength = 0;
let text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function type() {
  let textChar = text.charAt(textLength++);
  let paragraph = document.getElementById("typed");
  let charElement = document.createTextNode(textChar);
  paragraph.appendChild(charElement);
  if (textLength < text.length + 1) {
    setTimeout("type()", 50);
  } else {
    text = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  type();
});

// volume slider
$("#volume").slider({
  min: 0,
  max: 100,
  value: 0,
  range: "min",
  slide: function(event, ui) {
    setVolume(ui.value / 100);
  }
});

var myMedia = document.createElement('audio');
$('#player').append(myMedia);
myMedia.id = "myMedia";

playAudio('assets/keyboard.mp3', 0);

function playAudio(fileName, myVolume) {
    myMedia.src = fileName;
    myMedia.setAttribute('loop', 'loop');
    setVolume(myVolume);
    myMedia.play();
}

function setVolume(myVolume) {
  var myMedia = document.getElementById('myMedia');
  myMedia.volume = myVolume;
}