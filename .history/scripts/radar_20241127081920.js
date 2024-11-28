const canvas = document.getElementById('radarCanvas');
const ctx = canvas.getContext('2d');
let lastDraw = performance.now();

function draw(elapsed) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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

  // Function to clear outside the circle
  function clearOutsideCircle(ctx, centerX, centerY, radius) {
    // Save the current context state
    ctx.save();

    // Draw the circular path for the inside area
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();

    // Clip to the circle
    ctx.clip();

    // Clear everything outside the circle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Restore the original context state
    ctx.restore();
  }

  // Function to draw the circle outline
  function drawCircleOutline(ctx, centerX, centerY, radius) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'black'; // Circle border color
    ctx.lineWidth = 2; // Circle border thickness
    ctx.fill();
  }

  // Draw the grid

  // Clear the outside of the circle

  // Draw the circle outline
  drawCircleOutline(ctx, centerX, centerY, radius);

  drawGrid(ctx, 20);

  clearOutsideCircle(ctx, centerX, centerY, radius);
}

function drawLoop() {
  draw(performance.now() - lastDraw);
  lastDraw = performance.now();
  requestAnimationFrame(drawLoop);
}

requestAnimationFrame(drawLoop);