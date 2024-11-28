const canvas = document.getElementById('radar');
const ctx = canvas.getContext('2d');

function draw(elapsed) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(
    canvas.width / 2 + 100 * Math.cos(elapsed / 1000),
    canvas.height / 2 + 100 * Math.sin(elapsed / 1000)
  );
  ctx.stroke();
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);