export function intersects(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function screenToWorld(canvas, camera, event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (event.clientX - rect.left) * scaleX + camera.x,
    y: (event.clientY - rect.top) * scaleY + camera.y,
  };
}

export function snapToGrid(value, gridSize) {
  return Math.floor(value / gridSize) * gridSize;
}
