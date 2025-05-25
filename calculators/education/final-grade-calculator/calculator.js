document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('finalForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const current = parseFloat(document.getElementById('current').value);
    const weight = parseFloat(document.getElementById('weight').value) / 100;
    const desired = parseFloat(document.getElementById('desired').value);

    if (isNaN(current) || isNaN(weight) || isNaN(desired) || weight <= 0 || weight >= 1) {
      result.textContent = 'Please enter valid percentages for all fields.';
      return;
    }

    const required = (desired - ((1 - weight) * current)) / weight;

    if (required > 100) {
      result.textContent = `You need ${required.toFixed(2)}% on the final — which is above 100%. You may want to aim for the best you can and talk to your instructor.`;
    } else if (required < 0) {
      result.textContent = `You need ${required.toFixed(2)}% — you've already secured your desired grade!`;
    } else {
      result.textContent = `You need to score ${required.toFixed(2)}% on the final to get a ${desired}% in the course.`;
    }
  });
});
