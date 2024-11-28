const canvas = document.getElementById('radarCanvas');
const ctx = canvas.getContext('2d');
let lastDraw = performance.now();

size = Math.min(window.innerWidth, window.innerHeight);

ctx.canvas.width = size;
ctx.canvas.height = size;

scaleFactor = size / 500;

angle = 5;

function draw(elapsed) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  angle += 0.5;

  const height = canvas.height;
  const width = canvas.width;
  const r = canvas.height / 3;
  const R = canvas.height / 2;


  // Draw the radar circle
  ctx.fillStyle = '#294c22';
  ctx.beginPath();
  ctx.arc(R, R, r, 0, 2 * Math.PI);
  ctx.fill();

  // 
  ctx.strokeStyle = '#3a682e';
  ctx.lineWidth = scaleFactor;
  for (let i = 0; i < 2 * R; i += R / 8) {
    for (let j = 0; j < 2 * R; j += R / 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 2 * R);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(2 * R, j);
      ctx.stroke();
    }
  }

  // Clear the outside circle
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(R, R, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';


  // Draw grid lines (4 lines, 90 degrees apart)
  ctx.strokeStyle = '#54c638';
  ctx.lineWidth = 2 * scaleFactor;
  for (let i = 0; i < 360; i += 90) {
    ctx.beginPath();
    ctx.moveTo(R, R);
    ctx.lineTo(R + r * Math.cos(i * Math.PI / 180), R + r * Math.sin(i * Math.PI / 180));
    ctx.stroke();
  }

  // Circle outlines 5
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.arc(R, R, r / 5 * i, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Draw the radar sweep
  ctx.strokeStyle = '#54c638';
  ctx.lineWidth = 2 * scaleFactor;
  ctx.beginPath();
  ctx.moveTo(R, R);
  ctx.lineTo(R + r * Math.cos(-angle * Math.PI / 180), R + r * Math.sin(-angle * Math.PI / 180));
  ctx.stroke();

  // Draw the radar arc sweep (15 deg) low opacity
  const startX = R + r * Math.cos(-angle * Math.PI / 180);
  const startY = R + r * Math.sin(-angle * Math.PI / 180);
  const endX = R + r * Math.cos((-angle + 179) * Math.PI / 180);
  const endY = R + r * Math.sin((-angle + 179) * Math.PI / 180);

  // Create a linear gradient
  const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
  gradient.addColorStop(0, '#54c638'); // Start with red
  gradient.addColorStop(0.5, '#54c63800'); // End with blue

  ctx.fillStyle = gradient;
  ctx.lineWidth = 2 * scaleFactor;
  ctx.globalAlpha = 0.3;
  ctx.beginPath();
  ctx.moveTo(R, R);
  ctx.arc(R, R, r, -angle * Math.PI / 180, (-angle + 60) * Math.PI / 180);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawLoop() {
  draw(performance.now() - lastDraw);
  lastDraw = performance.now();
  requestAnimationFrame(drawLoop);
}

requestAnimationFrame(drawLoop);