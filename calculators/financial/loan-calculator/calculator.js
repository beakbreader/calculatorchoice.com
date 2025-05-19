document.getElementById('loanForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById('amount').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100 / 12;
  const years = parseFloat(document.getElementById('years').value) * 12;

  const payment = (amount * rate) / (1 - Math.pow(1 + rate, -years));
  const total = payment * years;
  const interest = total - amount;

  document.getElementById('result').innerHTML = `
    <p>Monthly Payment: <strong>$${payment.toFixed(2)}</strong></p>
    <p>Total Interest: <strong>$${interest.toFixed(2)}</strong></p>
    <p>Total Repayment: <strong>$${total.toFixed(2)}</strong></p>
  `;
});
