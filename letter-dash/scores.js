const HIGH_SCORE_KEY = "letter-dash-high-scores";
const BONUS_POINTS = 100;
const SUPER_BONUS_POINTS = 1000;
const BOMB_PENALTY = 100;

function letterPoints(letter) {
  if (!letter) return 0;
  const code = letter.toUpperCase().charCodeAt(0);
  if (code >= 65 && code <= 90) return code - 64;
  return 0;
}

function obstaclePoints(obs) {
  if (obs?.type === "superbonus") return SUPER_BONUS_POINTS;
  if (obs?.type === "bonus") return BONUS_POINTS;
  return letterPoints(obs?.letter);
}

function loadHighScores() {
  try {
    const raw = localStorage.getItem(HIGH_SCORE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHighScores(scores) {
  localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(scores));
}

function addHighScore(score, levelName, playerName) {
  if (score <= 0) return loadHighScores();

  const scores = loadHighScores();
  scores.push({
    score,
    level: levelName || "Unknown",
    name: (playerName || "").trim().slice(0, 20) || "Player",
    date: Date.now(),
  });
  scores.sort((a, b) => b.score - a.score);
  const top5 = scores.slice(0, 5);
  saveHighScores(top5);
  return top5;
}

function isNewHighScore(score) {
  if (score <= 0) return false;
  const scores = loadHighScores();
  if (scores.length < 5) return true;
  return score > scores[scores.length - 1].score;
}

function formatScoreDate(timestamp) {
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
