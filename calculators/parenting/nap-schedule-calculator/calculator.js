document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('napForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const wakeTime = document.getElementById('wakeTime').value;
    let naps = 0;
    let message = '';

    if (age <= 3) {
      naps = 4;
      message = 'Newborns typically need 4–5 naps per day and sleep ~14–17 hours total.';
    } else if (age <= 6) {
      naps = 3;
      message = 'At this age, babies usually take 3–4 naps/day and sleep around 14–16 hours total.';
    } else if (age <= 9) {
      naps = 2;
      message = 'Babies 7–9 months generally take 2–3 naps/day, sleeping about 14–15 hours total.';
    } else if (age <= 18) {
      naps = 2;
      message = 'From 10–18 months, 2 naps/day are common, with 13–14 hours of total sleep.';
    } else if (age <= 36) {
      naps = 1;
      message = 'Toddlers typically have 1 nap/day and need ~12–14 hours of sleep.';
    } else {
      result.textContent = 'Age out of range. Please enter 0–36 months.';
      return;
    }

    if (wakeTime) {
      const parts = wakeTime.split(':');
      let hour = parseInt(parts[0]);
      let minute = parseInt(parts[1]);
      const schedule = [];
      let time = new Date();
      time.setHours(hour);
      time.setMinutes(minute);

      for (let i = 0; i < naps; i++) {
        time.setHours(time.getHours() + 2);
        const napStart = new Date(time);
        time.setMinutes(time.getMinutes() + 60);
        const napEnd = new Date(time);
        schedule.push(`Nap ${i + 1}: ${napStart.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${napEnd.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`);
      }

      result.innerHTML = `<p>${message}</p><ul>${schedule.map(n => `<li>${n}</li>`).join('')}</ul>`;
    } else {
      result.innerHTML = `<p>${message}</p><p>Recommended naps: ${naps}</p>`;
    }
  });
});
