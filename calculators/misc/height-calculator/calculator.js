document.getElementById("convertToCm").addEventListener("click", () => {
  const feet = parseFloat(document.getElementById("feet").value) || 0;
  const inches = parseFloat(document.getElementById("inches").value) || 0;
  const totalInches = (feet * 12) + inches;
  const centimeters = (totalInches * 2.54).toFixed(2);
  document.getElementById("centimeters").value = centimeters;
  document.getElementById("result-output").textContent = `${feet} ft ${inches} in = ${centimeters} cm`;
});

document.getElementById("convertToFtIn").addEventListener("click", () => {
  const cm = parseFloat(document.getElementById("centimeters").value);
  if (isNaN(cm) || cm < 0) {
    document.getElementById("result-output").textContent = "Please enter a valid number of centimeters.";
    return;
  }
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = (totalInches % 12).toFixed(2);
  document.getElementById("feet").value = feet;
  document.getElementById("inches").value = inches;
  document.getElementById("result-output").textContent = `${cm} cm = ${feet} ft ${inches} in`;
});
