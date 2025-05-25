document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('studyForm');
  const result = document.getElementById('result');
  const generateBtn = document.getElementById('generateInputs');
  const creditInputs = document.getElementById('creditInputs');

  generateBtn.addEventListener('click', () => {
    const count = parseInt(document.getElementById('courses').value);
    creditInputs.innerHTML = '';
    for (let i = 1; i <= count; i++) {
      const label = document.createElement('label');
      label.innerHTML = `Course ${i} Credit Hours:`;
      const input = document.createElement('input');
      input.type = 'number';
      input.min = '1';
      input.required = true;
      input.classList.add('credit');
      creditInputs.appendChild(label);
      creditInputs.appendChild(input);
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const credits = document.querySelectorAll('.credit');
    const intensity = parseFloat(document.getElementById('intensity').value);

    let totalHours = 0;
    let breakdown = [];

    credits.forEach((input, i) => {
      const credit = parseFloat(input.value);
      if (!isNaN(credit)) {
        const hours = credit * intensity;
        breakdown.push(`Course ${i + 1}: ${hours.toFixed(1)} hrs/week`);
        totalHours += hours;
      }
    });

    result.innerHTML = `<p><strong>Total Study Time:</strong> ${totalHours.toFixed(1)} hours/week</p><ul>${breakdown.map(line => `<li>${line}</li>`).join('')}</ul>`;
  });
});
