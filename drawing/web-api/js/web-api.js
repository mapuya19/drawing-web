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
  console.log(encodedText);

  let url = "https://api.funtranslations.com/translate/shakespeare.json?text=" + encodedText;

  let response = await fetch(url);

  if (response.ok) {
    let json = await response.json();
    transformText(json);
  } else {
    console.log("Error: " + response.status);
  }
};

transformText = (response) => {
  let translated = response.contents.translated;
  console.log(translated);

  document.querySelector("#change-me").textContent = translated;
};
