
function showGrowth() {
  const age = parseFloat(document.getElementById('age').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  if (!age || !weight || !height) {
    document.getElementById('result').innerText = "Please enter valid inputs.";
    return;
  }
  document.getElementById('result').innerText = 
    "Your baby's data has been recorded. Please consult a pediatrician for detailed interpretation.";
}
