function validate(input, requiredMsg) {
  // check if the value is not empty
  if (input) {
    return true;
  } else {
    return false;
  }
}

const form = document.getElementById("usrform");
const TEXT_REQUIRED = "Please enter some text";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = form.elements["texter"].value;
  let textValid = validate(text, TEXT_REQUIRED);

  if (textValid) {
    accessData(text);
  } else {
    alert("Enter some text!");
  }
});

accessData = async (text) => {
  let encodedText = encodeURIComponent(text.trim());
  // console.log(encodedText);

  let url =
    "https://api.funtranslations.com/translate/shakespeare.json?text=" +
    encodedText;

  let response = await fetch(url);

  if (response.ok) {
    let json = await response.json();
    transformText(json);
  } else {
    console.log("Error: " + response.status);
  }
};

function countWords(str) {
  const arr = str.split(" ");

  return arr.filter((word) => word !== "").length;
}

transformText = (response) => {
  let translated = response.contents.translated;
  document.querySelector("#change-me").textContent = translated;

  let counted = Math.abs(50 - countWords(translated));
  let newStyle =
    "linear-gradient(" + counted + "deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)";
  document.querySelector("body").style.background = newStyle;
  document.querySelector("body").style.backgroundSize = "400% 400%";
  document.querySelector("body").style.animation =
    "gradient 15s ease infinite;";
  document.querySelector("body").style.height = "100vh;";
  document.querySelector("body").style.fontFamily =
    "font-family: 'Roboto', sans-serif;";
  document.querySelector("body").style.color = "white";
  // console.log(
  //   getComputedStyle(document.querySelector("body"), null).getPropertyValue(
  //     "background"
  //   )
  // );
};
