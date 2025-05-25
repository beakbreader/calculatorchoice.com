function convertHeight() {
  const height = parseFloat(document.getElementById("height").value);
  const unit = document.getElementById("unit").value;
  const output = document.getElementById("result-output");

  if (isNaN(height) || height <= 0) {
    output.innerText = "Please enter a valid height.";
    return;
  }

  if (unit === "cm") {
    const totalInches = height / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = (totalInches % 12).toFixed(2);
    output.innerText = `${height} cm = ${feet} ft ${inches} in`;
  } else {
    const feet = Math.floor(height);
    const inches = (height - feet) * 100;
    const totalInches = (feet * 12) + (inches / 100 * 12);
    const centimeters = (totalInches * 2.54).toFixed(2);
    output.innerText = `${feet} ft ${inches.toFixed(0)} in = ${centimeters} cm`;
  }
}