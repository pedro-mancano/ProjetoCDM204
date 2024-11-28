const canvas = document.getElementById('radarCanvas');
const ctx = canvas.getContext('2d');
let lastDraw = performance.now();

function draw(elapsed) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const height = canvas.height;
  const width = canvas.width;
  const R = canvas.height / 2;


  // Draw the radar circle
  ctx.fillStyle = '#294c22';
  ctx.beginPath();
  ctx.arc(R, R, 200, 0, 2 * Math.PI);
  ctx.fill();

  // 
  ctx.strokeStyle = '#3a682e';
  ctx.lineWidth = 1;
  for (let i = 0; i < 2 * R; i += R / 5) {
    for (let j = 0; j < 2 * R; j += R / 5) {
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
  ctx.arc(R, R, 200, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';


  // Draw grid lines (4 lines, 90 degrees apart)
  ctx.strokeStyle = '#54c638';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 360; i += 90) {
    ctx.beginPath();
    ctx.moveTo(R, R);
    ctx.lineTo(R + 200 * Math.cos(i * Math.PI / 180), R + 200 * Math.sin(i * Math.PI / 180));
    ctx.stroke();
  }

  // Circle outlines 5
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(R, R, R / 4.5 * i, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

function drawLoop() {
  draw(performance.now() - lastDraw);
  lastDraw = performance.now();
  requestAnimationFrame(drawLoop);
}

requestAnimationFrame(drawLoop);