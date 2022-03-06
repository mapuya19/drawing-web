const keyboard = document.querySelector("#sixty");

window.addEventListener('scroll', function(event) {
    let randomNum = Math.floor(Math.random() * 360);
    console.log(randomNum);
    keyboard.style.transform = "rotate(" + randomNum + "deg)";
}, true);