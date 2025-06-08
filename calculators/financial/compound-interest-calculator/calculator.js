// calculator.js

function formatCurrency(value) {
  return '$' +
    Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
}

function calculateCompoundInterest() {
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const times = parseInt(document.getElementById('times').value);
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
  if (isNaN(times) || times <= 0) {
    output.innerText = 'Please enter how many times interest is compounded per year.';
    return;
  }
  if (isNaN(years) || years < 0) {
    output.innerText = 'Please enter a valid number of years.';
    return;
  }

  const amount = principal * Math.pow((1 + (rate / 100) / times), times * years);
  const interest = amount - principal;

  output.innerHTML = `
    <strong>Total Amount:</strong> ${formatCurrency(amount)}<br>
    <strong>Total Interest:</strong> ${formatCurrency(interest)}
  `;
}

['principal', 'rate', 'times', 'years'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    calculateCompoundInterest();
  });
});

window.addEventListener('DOMContentLoaded', calculateCompoundInterest);
