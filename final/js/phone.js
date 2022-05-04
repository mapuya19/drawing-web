// volume slider
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

playAudio("assets/notis.mp3", 0);

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

// sliding windows
$(function () {
  var windowWidth = $(".window").width();
  var windowHeight = $(".window").height();
  var i = 0;
  var panelAmount = $(".sp-panel").length;

  $(".sp-panel").css("width", windowWidth);
  $(".sp-panel").css("height", windowHeight);

  $(".right").click(function () {
    i += 1;

    if (i < 0) {
      i = panelAmount - 1;
    }

    if (i >= panelAmount) {
      i = 0;
    }

    var pos = i * windowWidth;
    $(".sp-panel-set").css("left", -pos + "px");
  });

  $(".left").click(function () {
    i -= 1;

    if (i < 0) {
      i = panelAmount - 1;
    }

    if (i >= panelAmount) {
      i = 0;
    }

    var pos = i * windowWidth;
    $(".sp-panel-set").css("left", -pos + "px");
  });
});

$("#volume").slider({
  min: 0,
  max: 100,
  value: 0,
  range: "min",
  slide: function (event, ui) {
    setVolume(ui.value / 100);
  },
});

// pixelate images
const filter = document.querySelector("#pixelate"),
  dot = filter.querySelector("#dot"),
  spacing = filter.querySelector("#spacing"),
  size = filter.querySelector("#size");

const filter2 = document.querySelector("#pixelate2"),
  dot2 = filter.querySelector("#dot2"),
  spacing2 = filter.querySelector("#spacing2"),
  size2 = filter.querySelector("#size2");

const filter3 = document.querySelector("#pixelate3"),
  dot3 = filter.querySelector("#dot3"),
  spacing3 = filter.querySelector("#spacing3"),
  size3 = filter.querySelector("#size3");

const update = function () {
  const diameter = 5,
    radius = diameter / 2;
  spacing.setAttribute("width", diameter);
  spacing.setAttribute("height", diameter);
  size.setAttribute("radius", radius);
};

update();
