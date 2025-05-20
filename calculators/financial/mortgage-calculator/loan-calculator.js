document.getElementById('loanForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('amount').value);
  const interest = parseFloat(document.getElementById('interest').value) / 100 / 12;
  const years = parseFloat(document.getElementById('years').value);
  const n = years * 12;

  const monthly = (amount * interest) / (1 - Math.pow(1 + interest, -n));
  const resultDiv = document.getElementById('result');

  if (!isNaN(monthly) && isFinite(monthly)) {
    resultDiv.textContent = `Monthly Payment: $${monthly.toFixed(2)}`;
  } else {
    resultDiv.textContent = "Please enter valid numbers in all fields.";
  }
});