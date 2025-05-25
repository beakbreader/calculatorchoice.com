const calculators = [
  { name: "BMI Calculator", slug: "bmi-calculator", category: "health" },
  { name: "Height Predictor", slug: "height-predictor", category: "health" },
  { name: "Ideal Weight Calculator", slug: "ideal-weight-calculator", category: "health" },
  { name: "Body Fat Calculator", slug: "body-fat-calculator", category: "health" }
];

const searchInput = document.getElementById("searchBar");
const resultsList = document.getElementById("searchResults");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  resultsList.innerHTML = "";
  if (!query) return;

  const matches = calculators.filter(c => c.name.toLowerCase().includes(query));
  matches.forEach(calc => {
    const li = document.createElement("li");
    li.textContent = calc.name;
    li.onclick = () => window.location.href = `/calculators/${calc.slug}/`;
    resultsList.appendChild(li);
  });
});

document.getElementById("heightForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const father = parseFloat(document.getElementById("fatherHeight").value);
  const mother = parseFloat(document.getElementById("motherHeight").value);
  const gender = document.getElementById("gender").value;

  let predictedHeight;
  if (gender === "male") {
    predictedHeight = (father + mother + 13) / 2;
  } else {
    predictedHeight = (father + mother - 13) / 2;
  }

  document.getElementById("result").innerText =
    `Estimated adult height: ${predictedHeight.toFixed(1)} cm`;
});
