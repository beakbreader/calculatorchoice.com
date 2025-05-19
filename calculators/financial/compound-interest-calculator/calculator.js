document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("calculator");
  container.innerHTML = `
    <label>Principal Amount: <input type="number" id="principal"></label><br>
    <label>Annual Interest Rate (%): <input type="number" id="rate"></label><br>
    <label>Years: <input type="number" id="years"></label><br>
    <label>Compounds per Year: <input type="number" id="compound"></label><br>
    <button onclick="calculateCompound()">Calculate</button>
    <p id="result"></p>
  `;

  window.calculateCompound = function () {
    const P = parseFloat(document.getElementById("principal").value);
    const r = parseFloat(document.getElementById("rate").value) / 100;
    const t = parseFloat(document.getElementById("years").value);
    const n = parseFloat(document.getElementById("compound").value);
    const A = P * Math.pow(1 + r / n, n * t);
    document.getElementById("result").innerText = "Final Amount: $" + A.toFixed(2);
  };
});
