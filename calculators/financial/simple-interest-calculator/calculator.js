// calculator.js

function formatCurrency(value) {
  return '$' +
    Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
}

function calculateSimpleInterest() {
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const years = parseFloat(document.getElementById('years').value);
  const output = document.getElementById('output');

  if (isNaN(principal) || principal <= 0) {
    output.innerText = 'Please enter a valid principal amount.';
    return;
  }
  if (isNaN(rate) || rate < 0) {
    output.innerText = 'Please enter a valid interest rate.';
    return;
  }
  if (isNaN(years) || years < 0) {
    output.innerText = 'Please enter a valid number of years.';
    return;
  }

  const interest = (principal * rate * years) / 100;
  const amount = principal + interest;

  output.innerHTML = `
    <strong>Total Amount:</strong> ${formatCurrency(amount)}<br>
    <strong>Total Interest:</strong> ${formatCurrency(interest)}
  `;
}

['principal', 'rate', 'years'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    calculateSimpleInterest();
  });
});

window.addEventListener('DOMContentLoaded', calculateSimpleInterest);
