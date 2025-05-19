document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("calculator");
  container.innerHTML = `
    <label>Savings Goal: <input type="number" id="goal"></label><br>
    <label>Years to Save: <input type="number" id="years"></label><br>
    <label>Expected Annual Return (%): <input type="number" id="rate"></label><br>
    <button onclick="calculateSavings()">Calculate</button>
    <p id="result"></p>
  `;

  window.calculateSavings = function () {
    const FV = parseFloat(document.getElementById("goal").value);
    const t = parseFloat(document.getElementById("years").value);
    const r = parseFloat(document.getElementById("rate").value) / 100;
    const monthlyRate = r / 12;
    const n = t * 12;
    const P = FV * monthlyRate / (Math.pow(1 + monthlyRate, n) - 1);
    document.getElementById("result").innerText = "Monthly Savings Needed: $" + P.toFixed(2);
  };
});
