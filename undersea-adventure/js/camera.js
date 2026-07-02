export function createCamera(viewWidth, viewHeight) {
  return { x: 0, y: 0, viewWidth, viewHeight };
}

export function followTarget(camera, target, worldWidth, worldHeight) {
  camera.x = target.x + target.width / 2 - camera.viewWidth / 2;
  camera.y = target.y + target.height / 2 - camera.viewHeight / 2;

  camera.x = Math.max(0, Math.min(camera.x, worldWidth - camera.viewWidth));
  camera.y = Math.max(0, Math.min(camera.y, worldHeight - camera.viewHeight));
}
