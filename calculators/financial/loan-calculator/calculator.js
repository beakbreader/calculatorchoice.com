document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("calculator");
  container.innerHTML = `
    <label>Loan Amount: <input type="number" id="amount"></label><br>
    <label>Annual Interest Rate (%): <input type="number" id="rate"></label><br>
    <label>Loan Term (years): <input type="number" id="years"></label><br>
    <button onclick="calculateLoan()">Calculate</button>
    <p id="result"></p>
  `;

  window.calculateLoan = function () {
    const amount = parseFloat(document.getElementById("amount").value);
    const rate = parseFloat(document.getElementById("rate").value) / 100 / 12;
    const years = parseFloat(document.getElementById("years").value) * 12;
    const payment = (amount * rate) / (1 - Math.pow(1 + rate, -years));
    document.getElementById("result").innerText = "Monthly Payment: $" + payment.toFixed(2);
  };
});
