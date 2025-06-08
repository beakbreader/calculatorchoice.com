// calculator.js

function formatCurrency(value) {
  return (
    '$' +
    parseFloat(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function calculateSavingsGoal() {
  const goalAmount = parseFloat(document.getElementById('goalAmount').value);
  const annualRate = parseFloat(document.getElementById('monthlyRate').value);
  const years = parseFloat(document.getElementById('years').value);
  const output = document.getElementById('output');

  if (isNaN(goalAmount) || goalAmount <= 0) {
    output.innerText = 'Please enter a valid savings goal.';
    return;
  }
  if (isNaN(annualRate) || annualRate < 0) {
    output.innerText = 'Please enter a valid interest rate.';
    return;
  }
  if (isNaN(years) || years <= 0) {
    output.innerText = 'Please enter a valid number of years.';
    return;
  }

  const r = annualRate / 100 / 12;
  const n = years * 12;

  const monthly = r === 0 ? goalAmount / n : goalAmount * (r / (Math.pow(1 + r, n) - 1));

  output.innerHTML = `
    <strong>Monthly Savings Needed:</strong> ${formatCurrency(monthly)}
  `;
}

['goalAmount', 'monthlyRate', 'years'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    calculateSavingsGoal();
  });
});

window.addEventListener('DOMContentLoaded', calculateSavingsGoal);
