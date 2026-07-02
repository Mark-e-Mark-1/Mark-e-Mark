const keys = new Set();
let inputTarget = null;
let pointerJumpDown = false;
let jumpWasDown = false;

function onPointerDown(event) {
  if (event.button !== 0) return;

  event.preventDefault();
  pointerJumpDown = true;

  try {
    event.currentTarget.setPointerCapture(event.pointerId);
  } catch {
    // Pointer capture can fail in some embedded browsers.
  }
}

function onPointerUp(event) {
  if (event.button !== 0) return;
  pointerJumpDown = false;
}

function onPointerCancel() {
  pointerJumpDown = false;
}

export function bindGameplayInput(canvas) {
  unbindGameplayInput();
  inputTarget = canvas;
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerCancel);
  canvas.addEventListener("lostpointercapture", onPointerCancel);
}

export function unbindGameplayInput() {
  if (!inputTarget) return;

  inputTarget.removeEventListener("pointerdown", onPointerDown);
  inputTarget.removeEventListener("pointerup", onPointerUp);
  inputTarget.removeEventListener("pointercancel", onPointerCancel);
  inputTarget.removeEventListener("lostpointercapture", onPointerCancel);
  inputTarget = null;
  pointerJumpDown = false;
  jumpWasDown = false;
}

window.addEventListener("keydown", (e) => {
  keys.add(e.code);
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
    e.preventDefault();
  }
});

window.addEventListener("keyup", (e) => keys.delete(e.code));

export function isDown(code) {
  return keys.has(code);
}

export function axisX() {
  let x = 0;
  if (isDown("ArrowLeft") || isDown("KeyA")) x -= 1;
  if (isDown("ArrowRight") || isDown("KeyD")) x += 1;
  return x;
}

export function jumpPressed() {
  return isDown("Space") || isDown("ArrowUp") || isDown("KeyW") || pointerJumpDown;
}

export function jumpTriggered() {
  const down = jumpPressed();
  const triggered = down && !jumpWasDown;
  jumpWasDown = down;
  return triggered;
}
