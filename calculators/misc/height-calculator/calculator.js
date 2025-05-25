function calculateHeight() {
  const gender = document.getElementById("gender").value;
  const fatherHeight = parseFloat(document.getElementById("fatherHeight").value);
  const motherHeight = parseFloat(document.getElementById("motherHeight").value);

  if (isNaN(fatherHeight) || isNaN(motherHeight)) {
    document.getElementById("result").textContent = "—";
    return;
  }

  let estimatedHeight;
  if (gender === "male") {
    estimatedHeight = (fatherHeight + motherHeight * 1.08) / 2;
  } else {
    estimatedHeight = (fatherHeight * 0.923 + motherHeight) / 2;
  }

  const feet = Math.floor(estimatedHeight / 12);
  const inches = Math.round(estimatedHeight % 12);

  document.getElementById("result").textContent = `${feet} ft ${inches} in (${estimatedHeight.toFixed(1)} in)`;
}

document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", calculateHeight);
});
