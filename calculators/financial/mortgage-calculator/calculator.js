document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("calculator");
  container.innerHTML = `
    <label>Home Price: <input type="number" id="price"></label><br>
    <label>Down Payment: <input type="number" id="down"></label><br>
    <label>Interest Rate (%): <input type="number" id="rate"></label><br>
    <label>Loan Term (years): <input type="number" id="term"></label><br>
    <button onclick="calculateMortgage()">Calculate</button>
    <p id="result"></p>
  `;

  window.calculateMortgage = function () {
    const price = parseFloat(document.getElementById("price").value);
    const down = parseFloat(document.getElementById("down").value);
    const loan = price - down;
    const rate = parseFloat(document.getElementById("rate").value) / 100 / 12;
    const term = parseFloat(document.getElementById("term").value) * 12;
    const payment = (loan * rate) / (1 - Math.pow(1 + rate, -term));
    document.getElementById("result").innerText = "Monthly Mortgage: $" + payment.toFixed(2);
  };
});
