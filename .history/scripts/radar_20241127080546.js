const canvas = document.getElementById('radarCanvas');
const ctx = canvas.getContext('2d');
let lastDraw = performance.now();

function draw(elapsed) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const height = canvas.height;
  const width = canvas.width;

  ctx.fillStyle = '#294c22';
  // Draw the radar circle
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 200, 0, 2 * Math.PI);
  ctx.fill();
  //
  ctx.strokeStyle = '#3a682e';
  ctx.lineWidth = 1;
  for (let i = 0; i < width; i += width / 10) {
    for (let j = 0; j < height; j += height / 10) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(width, j);
      ctx.fill();
    }
  }
  // Draw grid lines (4 lines, 90 degrees apart)
  ctx.strokeStyle = '#54c638';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 360; i += 90) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + 200 * Math.cos(i * Math.PI / 180), canvas.height / 2 + 200 * Math.sin(i * Math.PI / 180));
    ctx.stroke();
  }
}

function drawLoop() {
  draw(performance.now() - lastDraw);
  lastDraw = performance.now();
  requestAnimationFrame(drawLoop);
}

requestAnimationFrame(drawLoop);