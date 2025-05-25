document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('dueForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const lmp = document.getElementById('lmp').value;
    let cycle = parseInt(document.getElementById('cycle').value);
    if (isNaN(cycle)) cycle = 28;

    const lmpDate = new Date(lmp);
    if (!lmpDate.getTime()) {
      result.textContent = 'Please enter a valid date.';
      return;
    }

    const adjustedDays = (cycle - 28);
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280 + adjustedDays);

    const today = new Date();
    const timeDiff = today - lmpDate;
    const weeksPregnant = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));

    result.innerHTML = `<p><strong>Estimated Due Date:</strong> ${dueDate.toDateString()}</p>
      <p><strong>Current Pregnancy Week:</strong> ${weeksPregnant}</p>`;
  });
});
