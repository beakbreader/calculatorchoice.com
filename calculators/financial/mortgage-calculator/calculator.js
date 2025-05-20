// Mortgage Calculator Logic
document.getElementById('mortgage-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get input values
  const loanAmount = parseFloat(document.getElementById('loanAmount').value);
  const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
  const loanTermMonths = parseInt(document.getElementById('loanTerm').value) * 12;

  // Calculate monthly payment
  const x = Math.pow(1 + interestRate, loanTermMonths);
  const monthly = (loanAmount * interestRate * x) / (x - 1);

  const resultDiv = document.getElementById('result');
  if (!isNaN(monthly)) {
    resultDiv.textContent = `Monthly Payment: $${monthly.toFixed(2)}`;
  } else {
    resultDiv.textContent = "Please enter valid values.";
  }
});
