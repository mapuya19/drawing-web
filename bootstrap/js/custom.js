//JQUERY BOILERPLATE
$(document).ready(function () {
  $("#wrap").velocity("fadeIn", { duration: 1500 });

  $(function () {
    $("#index_title_text h1").hover(
      function () {
        $("#index_title_text h1").css("color", "#5EF2D1");
      },
      function () {
        $("#index_title_text h1").css("color", "#55C4F9");
      }
    );
  });

  $(function () {
    $("#index_big_text").hover(
      function () {
        $("#index_big_text").html("<h1>Click the buttons below!!!</h1>");
      },
      function () {
        $("#index_big_text").html(
          "<h2>Click the buttons below to learn more!</h2>"
        );
      }
    );
  });

  // Vibrate Home Button
  var interval = 10;
  var shake = 3;
  var vibrateIndex = 0;
  var selector = $("#header img");

  $(selector).hover(
    function () {
      vibrateIndex = setInterval(vibrate, interval);
    },
    function () {
      clearInterval(vibrateIndex);
      $(selector)
        .stop(true, false)
        .css({ position: "static", left: "0px", top: "0px" });
    }
  );

  var vibrate = function () {
    $(selector)
      .stop(true, false)
      .css({
        position: "relative",
        left: Math.round(Math.random() * shake) - (shake + 1) / 2 + "px",
        top: Math.round(Math.random() * shake) - (shake + 1) / 2 + "px",
      });
  };

  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "assets/tuturu_1.mp3");

  $("#fun_button").click(function () {
    audioElement.play();
  });

  $("#fun_button").click(function () {
    $("#fun_button").velocity();
  });

  TriggerClick = 0;

  $("#fun_button").click(function () {
    if (TriggerClick == 0) {
      TriggerClick = 1;
      $("#fun_button").velocity({ width: "300px" }, 500);
      $("#fun_button").velocity({ height: "200px" }, 500);
    } else {
      TriggerClick = 0;
      $("#fun_button").velocity({ width: "100px" }, 500);
      $("#fun_button").velocity({ height: "50px" }, 500);
    }
  });
});
