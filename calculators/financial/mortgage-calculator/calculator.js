document.getElementById('mortgage-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const P = parseFloat(document.getElementById('loanAmount').value);
  const r = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
  const n = parseFloat(document.getElementById('loanTerm').value) * 12;

  const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
  const downType = document.getElementById('downPaymentType').value;
  const principal = downType === 'percent' ? P * (1 - downPayment / 100) : P - downPayment;

  const propertyTax = parseFloat(document.getElementById('propertyTax').value) || 0;
  const insurance = parseFloat(document.getElementById('insurance').value) || 0;
  const hoaFees = parseFloat(document.getElementById('hoaFees').value) || 0;

  const monthlyPI = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalMonthly = monthlyPI + propertyTax + insurance + hoaFees;

  const totalRepayment = totalMonthly * n;
  const totalInterest = totalRepayment - principal;

  document.getElementById('monthlyPI').textContent = '$' + totalMonthly.toFixed(2);
  document.getElementById('totalRepayment').textContent = '$' + totalRepayment.toFixed(2);
  document.getElementById('totalInterest').textContent = '$' + totalInterest.toFixed(2);

  const schedule = document.getElementById('amortizationSchedule');
  schedule.innerHTML = "<h3>Amortization Schedule</h3><table><tr><th>Month</th><th>Principal</th><th>Interest</th><th>Balance</th></tr>";

  let balance = principal;
  for (let i = 1; i <= n; i++) {
    const interestPayment = balance * r;
    const principalPayment = monthlyPI - interestPayment;
    balance -= principalPayment;
    schedule.innerHTML += `<tr><td>${i}</td><td>$${principalPayment.toFixed(2)}</td><td>$${interestPayment.toFixed(2)}</td><td>$${Math.max(0, balance).toFixed(2)}</td></tr>`;
  }
  schedule.innerHTML += "</table>";
});
