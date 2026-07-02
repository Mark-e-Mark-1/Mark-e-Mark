import { normalizeProject } from "./data/defaultProject.js";
import { preloadBuiltinSounds } from "./engine/audio.js";
import { createRuntime } from "./runtime.js";

const canvas = document.getElementById("game");
const gameFrame = document.getElementById("game-frame");
const fullscreenButton = document.getElementById("fullscreen");

const response = await fetch("./project.json", { cache: "no-store" });
if (!response.ok) {
  throw new Error("Could not load project.json");
}

const project = normalizeProject(await response.json());
await preloadBuiltinSounds();
const runtime = createRuntime(canvas, project, { playSequence: true });

fullscreenButton.addEventListener("click", toggleFullscreen);
window.addEventListener("beforeunload", () => runtime.stop());

runtime.start();

async function toggleFullscreen() {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
    return;
  }

  await gameFrame.requestFullscreen();
}
