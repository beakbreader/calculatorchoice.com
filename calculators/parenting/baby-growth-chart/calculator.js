document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('growthForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const unit = document.getElementById('unit').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const head = parseFloat(document.getElementById('head').value);

    if (!age || !gender || isNaN(weight) || isNaN(height)) {
      result.textContent = 'Please fill in all required fields.';
      return;
    }

    let weightKg = unit === 'imperial' ? weight * 0.453592 : weight;
    let heightCm = unit === 'imperial' ? height * 2.54 : height;
    let headCm = unit === 'imperial' && head ? head * 2.54 : head;

    function estimatePercentile(value, median) {
      if (value < median * 0.9) return '< 15th percentile';
      if (value < median * 0.95) return '15th-30th percentile';
      if (value <= median * 1.05) return '30th-70th percentile';
      if (value <= median * 1.1) return '70th-85th percentile';
      return '> 85th percentile';
    }

    let base = gender === 'male' ? 1 : 0.95;
    let medianWeight = base * (3.5 + age * 0.6);
    let medianHeight = base * (50 + age * 1.2);
    let medianHead = base * (35 + age * 0.2);

    const weightPercentile = estimatePercentile(weightKg, medianWeight);
    const heightPercentile = estimatePercentile(heightCm, medianHeight);
    const headPercentile = headCm ? estimatePercentile(headCm, medianHead) : null;

    result.innerHTML = `
      <p><strong>Estimated Growth Percentiles:</strong></p>
      <ul>
        <li>Weight: ${weightPercentile}</li>
        <li>Height: ${heightPercentile}</li>
        ${headPercentile ? `<li>Head Circumference: ${headPercentile}</li>` : ''}
      </ul>
    `;
  });
});
