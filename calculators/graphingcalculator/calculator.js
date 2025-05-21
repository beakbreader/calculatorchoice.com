const ctx = document.getElementById('graphCanvas').getContext('2d');
const inputs = document.querySelectorAll('.inputs input');
let chart;

function evaluateFunctions() {
  const datasets = [];
  const colors = ['red', 'blue', 'green', 'purple', 'orange'];
  const xValues = [];

  for (let x = -10; x <= 10; x += 0.1) {
    xValues.push(x);
  }

  inputs.forEach((input, index) => {
    const expr = input.value.trim();
    if (!expr) return;

    try {
      const yValues = xValues.map(x => {
        const scope = { x };
        return math.evaluate(expr.replace('f(x)=', '').replace('y=', ''), scope);
      });

      datasets.push({
        label: expr,
        data: xValues.map((x, i) => ({ x, y: yValues[i] })),
        borderColor: colors[index % colors.length],
        fill: false,
        tension: 0.1,
        pointRadius: 0
      });
    } catch (e) {
      console.warn(`Error parsing "${expr}":`, e);
    }
  });

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { type: 'linear', position: 'bottom' },
        y: { type: 'linear' }
      },
      plugins: {
        zoom: {
          pan: { enabled: true, mode: 'xy' },
          zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'xy' }
        },
        tooltip: { enabled: true }
      }
    }
  });
}

inputs.forEach(input => {
  input.addEventListener('input', evaluateFunctions);
});

evaluateFunctions();
