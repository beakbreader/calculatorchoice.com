// Mortgage calculator logic

document.getElementById("mortgage-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get input values
  const price = parseFloat(document.getElementById("price").value);
  const down = parseFloat(document.getElementById("down").value);
  const years = parseInt(document.getElementById("years").value);
  const rate = parseFloat(document.getElementById("rate").value);

  const loanAmount = price - down;
  const monthlyRate = rate / 100 / 12;
  const totalPayments = years * 12;

  // Monthly payment formula
  const monthly =
    (loanAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -totalPayments));

  const totalPayment = monthly * totalPayments;
  const totalInterest = totalPayment - loanAmount;

  // Display results
  document.getElementById("loan-amount").textContent = `$${loanAmount.toFixed(2)}`;
  document.getElementById("monthly").textContent = `$${monthly.toFixed(2)}`;
  document.getElementById("total-payment").textContent = `$${totalPayment.toFixed(2)}`;
  document.getElementById("total-interest").textContent = `$${totalInterest.toFixed(2)}`;

  document.getElementById("results").classList.remove("hidden");
});