export function initScoreHudState(state) {
  state.scorePulse = 0;
  state.scoreGain = 0;
  state.trackedScore = state.score ?? 0;
}

export function updateScoreHud(state, dt) {
  if (state.score > state.trackedScore) {
    state.scoreGain = state.score - state.trackedScore;
    state.scorePulse = 0.6;
  }

  state.trackedScore = state.score;
  state.scorePulse = Math.max(0, state.scorePulse - dt);
}

export function drawScoreHud(ctx, project, state) {
  const label = (project.game.scoreLabel ?? "Score").toUpperCase();
  const pulse = state.scorePulse ?? 0;
  const pop = pulse > 0 ? 1 + Math.sin((1 - pulse / 0.6) * Math.PI) * 0.22 : 1;
  const x = 28;
  const labelY = 20;
  const scoreY = 46;

  ctx.textAlign = "left";
  ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;

  ctx.font = "700 15px system-ui, sans-serif";
  ctx.textBaseline = "top";
  ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
  ctx.fillText(label, x, labelY);

  const scoreText = String(state.score);
  ctx.save();
  ctx.translate(x, scoreY);
  ctx.scale(pop, pop);

  ctx.font = "900 48px system-ui, sans-serif";
  ctx.textBaseline = "top";
  const gradient = ctx.createLinearGradient(0, 0, 0, 52);
  gradient.addColorStop(0, "#fff7cc");
  gradient.addColorStop(0.45, "#fde047");
  gradient.addColorStop(1, "#f59e0b");

  ctx.lineJoin = "round";
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(120, 53, 15, 0.95)";
  ctx.strokeText(scoreText, 0, 0);

  ctx.shadowBlur = pulse > 0 ? 14 + pulse * 20 : 8;
  ctx.shadowColor = pulse > 0 ? "rgba(250, 204, 21, 0.95)" : "rgba(0, 0, 0, 0.45)";
  ctx.fillStyle = gradient;
  ctx.fillText(scoreText, 0, 0);
  ctx.restore();

  if (pulse > 0.05 && state.scoreGain > 0) {
    const fade = Math.min(1, pulse / 0.35);
    const floatY = labelY - 6 - (0.6 - pulse) * 40;
    ctx.save();
    ctx.globalAlpha = fade;
    ctx.font = "800 26px system-ui, sans-serif";
    ctx.textBaseline = "top";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(120, 53, 15, 0.85)";
    ctx.strokeText(`+${state.scoreGain}`, x + 8, floatY);
    ctx.fillStyle = "#fef08a";
    ctx.shadowColor = "rgba(250, 204, 21, 0.8)";
    ctx.shadowBlur = 10;
    ctx.fillText(`+${state.scoreGain}`, x + 8, floatY);
    ctx.restore();
  }
}

export function drawLevelCompleteBanner(ctx, project, state, options = {}) {
  const centerX = ctx.canvas.width / 2;
  const titleY = ctx.canvas.height / 2 - 56;
  const labelY = ctx.canvas.height / 2 + 18;
  const scoreY = ctx.canvas.height / 2 + 72;
  const hintY = ctx.canvas.height / 2 + 132;
  const label = (project.game.scoreLabel ?? "Score").toUpperCase();
  const scoreText = String(state.score);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = "900 68px system-ui, sans-serif";
  const titleGradient = ctx.createLinearGradient(centerX, titleY - 36, centerX, titleY + 36);
  titleGradient.addColorStop(0, "#ffffff");
  titleGradient.addColorStop(0.4, "#fde047");
  titleGradient.addColorStop(1, "#f59e0b");

  ctx.lineJoin = "round";
  ctx.lineWidth = 7;
  ctx.strokeStyle = "rgba(120, 53, 15, 0.95)";
  ctx.shadowColor = "rgba(250, 204, 21, 0.75)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 3;
  ctx.strokeText("Level Complete", centerX, titleY);

  ctx.fillStyle = titleGradient;
  ctx.fillText("Level Complete", centerX, titleY);

  ctx.shadowBlur = 6;
  ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
  ctx.shadowOffsetY = 2;
  ctx.font = "700 18px system-ui, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.fillText(label, centerX, labelY);

  ctx.font = "900 56px system-ui, sans-serif";
  const scoreGradient = ctx.createLinearGradient(centerX, scoreY - 30, centerX, scoreY + 30);
  scoreGradient.addColorStop(0, "#fff7cc");
  scoreGradient.addColorStop(0.45, "#fde047");
  scoreGradient.addColorStop(1, "#f59e0b");

  ctx.lineWidth = 6;
  ctx.strokeStyle = "rgba(120, 53, 15, 0.95)";
  ctx.strokeText(scoreText, centerX, scoreY);

  ctx.shadowBlur = 12;
  ctx.shadowColor = "rgba(250, 204, 21, 0.85)";
  ctx.fillStyle = scoreGradient;
  ctx.fillText(scoreText, centerX, scoreY);

  if (options.showNextHint) {
    ctx.font = "700 22px system-ui, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.shadowBlur = 6;
    ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
    ctx.fillText("Next level...", centerX, hintY);
  }
}

export function drawGameCompleteBanner(ctx, project, state) {
  const centerX = ctx.canvas.width / 2;
  const titleY = ctx.canvas.height / 2 - 56;
  const labelY = ctx.canvas.height / 2 + 18;
  const scoreY = ctx.canvas.height / 2 + 72;
  const label = (project.game.scoreLabel ?? "Score").toUpperCase();
  const scoreText = String(state.score);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = "900 68px system-ui, sans-serif";
  const titleGradient = ctx.createLinearGradient(centerX, titleY - 36, centerX, titleY + 36);
  titleGradient.addColorStop(0, "#ffffff");
  titleGradient.addColorStop(0.4, "#fde047");
  titleGradient.addColorStop(1, "#f59e0b");

  ctx.lineJoin = "round";
  ctx.lineWidth = 7;
  ctx.strokeStyle = "rgba(120, 53, 15, 0.95)";
  ctx.shadowColor = "rgba(250, 204, 21, 0.75)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 3;
  ctx.strokeText("Game Complete!", centerX, titleY);

  ctx.fillStyle = titleGradient;
  ctx.fillText("Game Complete!", centerX, titleY);

  ctx.shadowBlur = 6;
  ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
  ctx.shadowOffsetY = 2;
  ctx.font = "700 18px system-ui, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.fillText(label, centerX, labelY);

  ctx.font = "900 56px system-ui, sans-serif";
  const scoreGradient = ctx.createLinearGradient(centerX, scoreY - 30, centerX, scoreY + 30);
  scoreGradient.addColorStop(0, "#fff7cc");
  scoreGradient.addColorStop(0.45, "#fde047");
  scoreGradient.addColorStop(1, "#f59e0b");

  ctx.lineWidth = 6;
  ctx.strokeStyle = "rgba(120, 53, 15, 0.95)";
  ctx.strokeText(scoreText, centerX, scoreY);

  ctx.shadowBlur = 12;
  ctx.shadowColor = "rgba(250, 204, 21, 0.85)";
  ctx.fillStyle = scoreGradient;
  ctx.fillText(scoreText, centerX, scoreY);
}

export function drawEndGameMessage(ctx, state) {
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  const message = state.timeUp ? "Time Up!" : "Game Over!";

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 64px system-ui, sans-serif";

  const gradient = ctx.createLinearGradient(centerX, centerY - 32, centerX, centerY + 32);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.5, state.gameOver ? "#fca5a5" : "#fde047");
  gradient.addColorStop(1, state.gameOver ? "#ef4444" : "#f59e0b");

  ctx.lineJoin = "round";
  ctx.lineWidth = 6;
  ctx.strokeStyle = "rgba(15, 23, 42, 0.9)";
  ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
  ctx.shadowBlur = 14;
  ctx.strokeText(message, centerX, centerY);

  ctx.fillStyle = gradient;
  ctx.fillText(message, centerX, centerY);
}
