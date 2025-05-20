// Enhanced Mortgage Calculator
document.getElementById('mortgage-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Retrieve values
  const loanAmount = parseFloat(document.getElementById('loanAmount').value);
  const annualRate = parseFloat(document.getElementById('interestRate').value);
  const years = parseInt(document.getElementById('loanTerm').value);
  const taxRate = parseFloat(document.getElementById('propertyTax').value) || 0;
  const insuranceYearly = parseFloat(document.getElementById('homeInsurance').value) || 0;

  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  // Monthly principal & interest payment
  const x = Math.pow(1 + monthlyRate, totalMonths);
  const monthlyPI = (loanAmount * monthlyRate * x) / (x - 1);

  // Monthly taxes and insurance
  const monthlyTax = (loanAmount * (taxRate / 100)) / 12;
  const monthlyInsurance = insuranceYearly / 12;

  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance;

  const result = document.getElementById('result');
  if (!isNaN(totalMonthly)) {
    result.innerHTML = `
      Monthly Payment: <strong>$${totalMonthly.toFixed(2)}</strong><br>
      (Principal & Interest: $${monthlyPI.toFixed(2)}<br>
      Taxes: $${monthlyTax.toFixed(2)} | Insurance: $${monthlyInsurance.toFixed(2)})
    `;
  } else {
    result.textContent = "Please enter valid values.";
  }
});