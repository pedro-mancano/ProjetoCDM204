const canvas = document.getElementById('radarCanvas');
const ctx = canvas.getContext('2d');
let lastDraw = performance.now();

function draw(elapsed) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const height = canvas.height;
  const width = canvas.width;

  // Set canvas dimension

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 150;

  // Function to draw the grid
  function drawGrid(ctx, spacing) {
    ctx.beginPath();
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += spacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }

    for (let y = 0; y <= canvas.height; y += spacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }

    ctx.stroke();
  }

  // Function to mask the area outside the circle
  function maskOutsideCircle(ctx, centerX, centerY, radius) {
    // Save the current context state
    ctx.save();

    // Draw a clipping region in the shape of a circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();

    // Clear the outside of the circle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Restore the original context state
    ctx.restore();
  }

  // Draw the grid
  drawGrid(ctx, 20);

  // Mask the outside of the circle
  maskOutsideCircle(ctx, centerX, centerY, radius);
}

function drawLoop() {
  draw(performance.now() - lastDraw);
  lastDraw = performance.now();
  requestAnimationFrame(drawLoop);
}

requestAnimationFrame(drawLoop);