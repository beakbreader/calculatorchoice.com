// Loan calculator logic

document.getElementById("loan-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const rate = parseFloat(document.getElementById("rate").value);
  const term = parseInt(document.getElementById("term").value);
  const frequency = document.getElementById("frequency").value;

  let periodsPerYear;
  switch (frequency) {
    case "monthly": periodsPerYear = 12; break;
    case "biweekly": periodsPerYear = 26; break;
    case "weekly": periodsPerYear = 52; break;
  }

  const totalPayments = periodsPerYear * term;
  const periodRate = (rate / 100) / periodsPerYear;

  const payment = (amount * periodRate) / (1 - Math.pow(1 + periodRate, -totalPayments));
  const totalPayment = payment * totalPayments;
  const totalInterest = totalPayment - amount;

  document.getElementById("payment").textContent = `$${payment.toFixed(2)}`;
  document.getElementById("total-payment").textContent = `$${totalPayment.toFixed(2)}`;
  document.getElementById("total-interest").textContent = `$${totalInterest.toFixed(2)}`;

  document.getElementById("results").classList.remove("hidden");
});