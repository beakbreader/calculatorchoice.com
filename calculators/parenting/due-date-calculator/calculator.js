
function calculateDueDate() {
  const lmp = document.getElementById('lmp').value;
  if (!lmp) {
    document.getElementById('result').innerText = "Please enter a valid date.";
    return;
  }
  const startDate = new Date(lmp);
  const dueDate = new Date(startDate);
  dueDate.setDate(dueDate.getDate() + 280); // Add 40 weeks
  document.getElementById('result').innerText = "Estimated Due Date: " + dueDate.toDateString();
}
