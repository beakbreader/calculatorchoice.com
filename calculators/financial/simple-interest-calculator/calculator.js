document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("calculator");
  container.innerHTML = `
    <label>Principal Amount: <input type="number" id="principal"></label><br>
    <label>Annual Interest Rate (%): <input type="number" id="rate"></label><br>
    <label>Time (years): <input type="number" id="time"></label><br>
    <button onclick="calculateSimple()">Calculate</button>
    <p id="result"></p>
  `;

  window.calculateSimple = function () {
    const P = parseFloat(document.getElementById("principal").value);
    const R = parseFloat(document.getElementById("rate").value);
    const T = parseFloat(document.getElementById("time").value);
    const I = (P * R * T) / 100;
    document.getElementById("result").innerText = "Interest: $" + I.toFixed(2);
  };
});
