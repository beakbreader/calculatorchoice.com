const genderInput = document.getElementById("gender");
const fatherInput = document.getElementById("father-height");
const motherInput = document.getElementById("mother-height");
const resultOutput = document.getElementById("result");

function calculateHeight() {
  const gender = genderInput.value;
  const father = parseFloat(fatherInput.value);
  const mother = parseFloat(motherInput.value);

  if (isNaN(father) || isNaN(mother)) {
    resultOutput.textContent = "–";
    return;
  }

  let estimatedHeight;

  if (gender === "male") {
    estimatedHeight = (mother * 13 / 12 + father) / 2;
  } else {
    estimatedHeight = (father * 12 / 13 + mother) / 2;
  }

  resultOutput.textContent = estimatedHeight.toFixed(1);
}

genderInput.addEventListener("change", calculateHeight);
fatherInput.addEventListener("input", calculateHeight);
motherInput.addEventListener("input", calculateHeight);
