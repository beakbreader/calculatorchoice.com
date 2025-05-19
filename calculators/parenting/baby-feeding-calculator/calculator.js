
function calcFeeding() {
  const weight = parseFloat(document.getElementById('weight').value);
  if (!weight || weight <= 0) {
    document.getElementById('result').innerText = "Enter a valid weight.";
    return;
  }
  const intake = weight * 150; // average 150ml per kg per day
  document.getElementById('result').innerText = 
    "Estimated daily intake: " + intake.toFixed(0) + " ml";
}
