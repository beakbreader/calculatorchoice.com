// ULTIMATE GRAPHING CALCULATOR - CalculatorChoice.com
// Pure JS. No libraries. Touch + mouse. Desmos-style, SEO-friendly.

const COLORS = [
  "#fc466b", "#3f5efb", "#f9d423", "#21d4fd", "#a1ffce", "#fd6e6a", "#5f2c82"
];

let canvas = document.getElementById("graph-canvas");
let ctx = canvas.getContext("2d");
let dpr = window.devicePixelRatio || 1;

let width = canvas.width;
let height = canvas.height;

// Viewport (x/y min/max)
let view = { xmin: -10, xmax: 10, ymin: -6, ymax: 6 };

// State
let dragging = false;
let dragStart = {x: 0, y: 0};
let lastView = {...view};
let functions = [];
let liveUpdate = true;

// --- Helpers
function toCanvasX(x) {
  return (x - view.xmin) / (view.xmax - view.xmin) * width;
}
function toCanvasY(y) {
  return height - (y - view.ymin) / (view.ymax - view.ymin) * height;
}
function toGraphX(px) {
  return view.xmin + (px / width) * (view.xmax - view.xmin);
}
function toGraphY(py) {
  return view.ymin + ((height - py) / height) * (view.ymax - view.ymin);
}

// --- Parse and Create Functions Safely
function parseFunction(expr) {
  let safe = expr
    .replace(/(\d)\s*x/g, '$1*x')
    .replace(/x(\d)/g, 'x*$1')
    .replace(/\^/g, '**')
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/abs\(/g, 'Math.abs(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/exp\(/g, 'Math.exp(')
    .replace(/pi/gi, 'Math.PI')
    .replace(/e/g, 'Math.E')
    .replace(/y\s*=\s*/g, '');

  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function('x', `return ${safe};`);
    // Quick check: does it throw on a test value?
    fn(1);
    return fn;
  } catch {
    return null;
  }
}

// --- Drawing
function drawGrid() {
  ctx.save();
  ctx.strokeStyle = "#eee";
  ctx.lineWidth = 1;

  // Grid spacing (nicely rounded steps)
  let xstep = getStep((view.xmax - view.xmin) / 10);
  let ystep = getStep((view.ymax - view.ymin) / 10);

  // Vertical grid lines
  for(let x = Math.ceil(view.xmin/xstep)*xstep; x < view.xmax; x += xstep) {
    let px = toCanvasX(x);
    ctx.beginPath();
    ctx.moveTo(px, 0); ctx.lineTo(px, height);
    ctx.stroke();
  }
  // Horizontal grid lines
  for(let y = Math.ceil(view.ymin/ystep)*ystep; y < view.ymax; y += ystep) {
    let py = toCanvasY(y);
    ctx.beginPath();
    ctx.moveTo(0, py); ctx.lineTo(width, py);
    ctx.stroke();
  }

  // Axis
  ctx.strokeStyle = "#fc466b";
  ctx.lineWidth = 2.2;
  // Y-axis
  if (view.xmin < 0 && view.xmax > 0) {
    let x0 = toCanvasX(0);
    ctx.beginPath();
    ctx.moveTo(x0, 0); ctx.lineTo(x0, height);
    ctx.stroke();
  }
  // X-axis
  if (view.ymin < 0 && view.ymax > 0) {
    let y0 = toCanvasY(0);
    ctx.beginPath();
    ctx.moveTo(0, y0); ctx.lineTo(width, y0);
    ctx.stroke();
  }

  // Axis ticks + labels
  ctx.fillStyle = "#3f5efb";
  ctx.font = "12px 'Inter',Arial,sans-serif";
  ctx.textAlign = "center";
  // X ticks
  for(let x = Math.ceil(view.xmin/xstep)*xstep; x < view.xmax; x += xstep) {
    let px = toCanvasX(x);
    let y0 = toCanvasY(0);
    ctx.beginPath();
    ctx.moveTo(px, y0 - 6); ctx.lineTo(px, y0 + 6);
    ctx.stroke();
    ctx.fillText(roundSmart(x), px, y0 + 18);
  }
  // Y ticks
  ctx.textAlign = "right";
  for(let y = Math.ceil(view.ymin/ystep)*ystep; y < view.ymax; y += ystep) {
    let py = toCanvasY(y);
    let x0 = toCanvasX(0);
    ctx.beginPath();
    ctx.moveTo(x0 - 6, py); ctx.lineTo(x0 + 6, py);
    ctx.stroke();
    if (Math.abs(y) > 1e-10)
      ctx.fillText(roundSmart(y), x0 - 9, py + 4);
  }
  ctx.restore();
}

function drawFunctions() {
  let n = 700; // Higher for smoother graphs
  for(let i=0;i<functions.length;i++) {
    const {fn, color, expr, error} = functions[i];
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.3;
    ctx.beginPath();

    if (error) {
      ctx.font = "bold 17px 'Inter',Arial";
      ctx.fillStyle = color;
      ctx.fillText("Invalid function: " + expr, 40, 30+24*i);
      ctx.restore();
      continue;
    }

    let started = false;
    for(let j=0;j<=n;j++) {
      let x = view.xmin + (view.xmax-view.xmin)*(j/n);
      let y;
      try { y = fn(x); }
      catch { y = NaN; }
      if (!isFinite(y) || isNaN(y)) {
        started = false;
        continue;
      }
      let px = toCanvasX(x);
      let py = toCanvasY(y);
      if (!started) {
        ctx.moveTo(px, py);
        started = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.shadowColor = color + "77";
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.restore();
  }
}

// Pan/zoom
canvas.addEventListener('mousedown', (e) => {
  dragging = true;
  dragStart = {x: e.offsetX, y: e.offsetY};
  lastView = {...view};
});
canvas.addEventListener('touchstart', (e) => {
  dragging = true;
  let t = e.touches[0];
  dragStart = {x: t.clientX - canvas.getBoundingClientRect().left, y: t.clientY - canvas.getBoundingClientRect().top};
  lastView = {...view};
});

window.addEventListener('mousemove', (e) => {
  if (dragging) {
    let dx = (e.offsetX - dragStart.x) / width * (view.xmax - view.xmin);
    let dy = (e.offsetY - dragStart.y) / height * (view.ymax - view.ymin);
    view.xmin = lastView.xmin - dx;
    view.xmax = lastView.xmax - dx;
    view.ymin = lastView.ymin + dy;
    view.ymax = lastView.ymax + dy;
    drawAll();
  }
});
window.addEventListener('touchmove', (e) => {
  if (dragging) {
    let t = e.touches[0];
    let rect = canvas.getBoundingClientRect();
    let cx = t.clientX - rect.left, cy = t.clientY - rect.top;
    let dx = (cx - dragStart.x) / width * (view.xmax - view.xmin);
    let dy = (cy - dragStart.y) / height * (view.ymax - view.ymin);
    view.xmin = lastView.xmin - dx;
    view.xmax = lastView.xmax - dx;
    view.ymin = lastView.ymin + dy;
    view.ymax = lastView.ymax + dy;
    drawAll();
  }
});
window.addEventListener('mouseup', () => { dragging = false; });
window.addEventListener('touchend', () => { dragging = false; });

// Mouse wheel = zoom
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  let mx = toGraphX(e.offsetX);
  let my = toGraphY(e.offsetY);
  let scale = (e.deltaY < 0) ? 0.85 : 1.18;
  zoomAt(mx, my, scale);
});

function zoomAt(x, y, scale) {
  let nxmin = x + (view.xmin - x) * scale;
  let nxmax = x + (view.xmax - x) * scale;
  let nymin = y + (view.ymin - y) * scale;
  let nymax = y + (view.ymax - y) * scale;
  view.xmin = nxmin;
  view.xmax = nxmax;
  view.ymin = nymin;
  view.ymax = nymax;
  drawAll();
}

document.getElementById("zoom-in").onclick = () => zoomAt((view.xmin+view.xmax)/2, (view.ymin+view.ymax)/2, 0.8);
document.getElementById("zoom-out").onclick = () => zoomAt((view.xmin+view.xmax)/2, (view.ymin+view.ymax)/2, 1.25);
document.getElementById("reset-view").onclick = () => {
  view = {xmin:-10,xmax:10,ymin:-6,ymax:6};
  drawAll();
};

// --- Responsive Canvas
function resizeCanvas() {
  dpr = window.devicePixelRatio || 1;
  width = Math.max(350, canvas.offsetWidth);
  height = Math.max(220, canvas.offsetHeight);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
  drawAll();
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// --- Handle functions input
function getFunctions() {
  let fields = document.querySelectorAll(".function-entry input");
  let arr = [];
  for(let i=0;i<fields.length;i++) {
    let expr = fields[i].value.trim();
    if (!expr) continue;
    let fn = parseFunction(expr);
    arr.push({
      expr,
      fn,
      color: COLORS[i%COLORS.length],
      error: !fn
    });
  }
  return arr;
}
function updateFunctions() {
  functions = getFunctions();
  drawAll();
}
function drawAll() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawGrid();
  drawFunctions();
}
function getStep(range) {
  // Smart axis tick steps (1, 2, 5, 10, etc.)
  const mag = Math.pow(10, Math.floor(Math.log10(range)));
  const frac = range / mag;
  if (frac < 2) return mag/5;
  if (frac < 5) return mag/2;
  return mag;
}
function roundSmart(x) {
  if (Math.abs(x) < 1e-5) return "0";
  if (Math.abs(x) < 1) return x.toFixed(2);
  if (Math.abs(x) < 10) return x.toFixed(2);
  if (Math.abs(x) < 100) return x.toFixed(1);
  return x.toFixed(0);
}

// --- UI logic for adding/removing functions
function addFunctionField(val="") {
  let list = document.getElementById("functions-list");
  let idx = list.children.length;
  let div = document.createElement("div");
  div.className = "function-entry";
  div.innerHTML = `<input type="text" placeholder="y = f(x)" value="${val}"/>
    <button type="button" title="Remove">&#10005;</button>`;
  div.querySelector("button").onclick = function() {
    list.removeChild(div);
    updateFunctions();
  };
  div.querySelector("input").oninput = function() {
    if (liveUpdate) updateFunctions();
  };
  list.appendChild(div);
}
document.getElementById("add-function").onclick = function() {
  addFunctionField();
  updateFunctions();
};
// --- Main input
document.getElementById("function-form").onsubmit = function(e) {
  e.preventDefault();
  updateFunctions();
};
// Add the first field
addFunctionField();
// Real-time update
document.getElementById("function-input").oninput = function() {
  let v = this.value.trim();
  let list = document.getElementById("functions-list");
  if (list.children.length === 0) addFunctionField(v);
  else list.children[0].querySelector("input").value = v;
  updateFunctions();
};
// On page load, sync input
window.onload = function() {
  document.getElementById("function-input").value = "";
  updateFunctions();
};

// --- Cursor: Show coordinates & function value
canvas.addEventListener("mousemove", function(e) {
  let rect = canvas.getBoundingClientRect();
  let mx = (e.clientX - rect.left) * dpr;
  let my = (e.clientY - rect.top) * dpr;
  let x = toGraphX(mx);
  let y = toGraphY(my);
  drawAll();
  // Draw hover point(s)
  for(let i=0;i<functions.length;i++) {
    const {fn, color, error} = functions[i];
    if (!fn || error) continue;
    let fx;
    try { fx = fn(x); }
    catch { fx = NaN; }
    if (!isFinite(fx) || isNaN(fx)) continue;
    let px = toCanvasX(x), py = toCanvasY(fx);
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, 2 * Math.PI);
    ctx.fillStyle = color + "cc";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
    // Show coordinates
    ctx.save();
    ctx.font = "13px 'Inter',Arial";
    ctx.fillStyle = color;
    ctx.fillText(`x=${roundSmart(x)}, y=${roundSmart(fx)}`, px+30, py-12-i*18);
    ctx.restore();
  }
});

// --- Clean up canvas on mouseout
canvas.addEventListener("mouseleave", () => drawAll());

// Buttons live update toggle (you could expand this)
document.querySelectorAll(".function-entry input").forEach(inp => {
  inp.addEventListener("input", updateFunctions);
});

updateFunctions();
