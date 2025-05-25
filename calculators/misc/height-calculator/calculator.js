const calculators = [
  { name: "BMI Calculator", slug: "bmi-calculator", category: "health" },
  { name: "Loan Calculator", slug: "loan-calculator", category: "finance" },
  { name: "Retirement Calculator", slug: "retirement-calculator", category: "finance" },
  { name: "Height Predictor", slug: "height-predictor", category: "health" },
  { name: "Savings Calculator", slug: "savings-calculator", category: "finance" },
];

const searchInput = document.getElementById("searchBar");
const resultsList = document.getElementById("searchResults");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  resultsList.innerHTML = "";
  if (!query) return;

  const matches = calculators.filter(calc => calc.name.toLowerCase().includes(query));
  matches.forEach(calc => {
    const li = document.createElement("li");
    li.textContent = calc.name;
    li.onclick = () => window.location.href = `/calculators/${calc.slug}/`;
    resultsList.appendChild(li);
  });
});

document.getElementById("calculateBtn").addEventListener("click", () => {
  const gender = document.getElementById("gender").value;
  const motherHeight = parseFloat(document.getElementById("motherHeight").value);
  const fatherHeight = parseFloat(document.getElementById("fatherHeight").value);

  if (isNaN(motherHeight) || isNaN(fatherHeight)) {
    document.getElementById("result").textContent = "Please enter valid heights.";
    return;
  }

  let estimatedHeight;
  if (gender === "boy") {
    estimatedHeight = ((motherHeight * 13 / 12) + fatherHeight) / 2;
  } else {
    estimatedHeight = ((fatherHeight * 12 / 13) + motherHeight) / 2;
  }

  const feet = Math.floor(estimatedHeight / 12);
  const inches = Math.round(estimatedHeight % 12);
  document.getElementById("result").textContent = `Estimated Adult Height: ${feet}' ${inches}"`;
});