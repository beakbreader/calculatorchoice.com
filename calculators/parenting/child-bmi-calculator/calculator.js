
function calcChildBMI() {
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value) / 100;
  const bmi = weight / (height * height);
  document.getElementById('result').innerText = isFinite(bmi)
    ? "Estimated Child BMI: " + bmi.toFixed(2)
    : "Enter valid numbers.";
}
