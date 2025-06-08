document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('examForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const current = parseFloat(document.getElementById('current').value);
    const weight = parseFloat(document.getElementById('weight').value) / 100;
    const desired = parseFloat(document.getElementById('desired').value);

    if (isNaN(current) || isNaN(weight) || isNaN(desired) || weight <= 0 || weight > 1) {
      result.textContent = 'Please enter valid numbers for all fields.';
      return;
    }

    const needed = (desired - (1 - weight) * current) / weight;
    let message = '';
    if (needed > 100) {
      message = `You need ${needed.toFixed(2)}%, which is more than 100%.`;
    } else if (needed < 0) {
      message = `You need ${needed.toFixed(2)}% — you\'ve already secured your goal!`;
    } else {
      message = `You need to score ${needed.toFixed(2)}% on the exam.`;
    }
    result.textContent = message;
  });
});
