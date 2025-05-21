// Compound interest calculator

document.getElementById("compound-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const P = parseFloat(document.getElementById("principal").value);
  const PMT = parseFloat(document.getElementById("contribution").value);
  const r = parseFloat(document.getElementById("rate").value) / 100;
  const t = parseInt(document.getElementById("years").value);
  const n = parseInt(document.getElementById("frequency").value);

  // Compound interest formula with contributions
  let futureValue = P * Math.pow(1 + r / n, n * t);
  for (let i = 1; i <= t * n; i++) {
    futureValue += PMT * Math.pow(1 + r / n, (n * t) - i);
  }

  const totalContributions = P + PMT * t * 12;
  const interestEarned = futureValue - totalContributions;

  document.getElementById("final-balance").textContent = `$${futureValue.toFixed(2)}`;
  document.getElementById("total-contributions").textContent = `$${totalContributions.toFixed(2)}`;
  document.getElementById("interest-earned").textContent = `$${interestEarned.toFixed(2)}`;

  document.getElementById("results").classList.remove("hidden");
});