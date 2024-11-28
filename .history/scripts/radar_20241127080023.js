const canvas = document.getElementById('radarCanvas');
const ctx = canvas.getContext('2d');
let lastDraw = performance.now();

function draw(elapsed) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#294c22';
  // Draw the radar circle
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 200, 0, 2 * Math.PI);
  ctx.fill();
}

function drawLoop() {
  draw(performance.now() - lastDraw);
  lastDraw = performance.now();
  requestAnimationFrame(drawLoop);
}

requestAnimationFrame(drawLoop);