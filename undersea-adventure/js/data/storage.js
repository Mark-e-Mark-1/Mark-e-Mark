import { createDefaultProject, normalizeProject } from "./defaultProject.js";

const STORAGE_KEY = "side-scroller-creator-project";
const DB_NAME = "side-scroller-creator-kit";
const DB_VERSION = 1;
const STORE_NAME = "projects";
const PROJECT_ID = "current";

export async function loadProject() {
  const indexedProject = await loadProjectFromIndexedDb();

  if (indexedProject) {
    return normalizeProject(indexedProject);
  }

  const savedProject = localStorage.getItem(STORAGE_KEY);

  try {
    return savedProject ? normalizeProject(JSON.parse(savedProject)) : normalizeProject(createDefaultProject());
  } catch {
    return normalizeProject(createDefaultProject());
  }
}

export async function saveProject(project) {
  try {
    await saveProjectToIndexedDb(project);
    return true;
  } catch (error) {
    console.warn("Project could not be saved to IndexedDB.", error);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
    return true;
  } catch (error) {
    console.warn("Project could not be saved locally. Large image assets may exceed browser storage limits.", error);
    return false;
  }
}

export function exportProject(project) {
  const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${project.name || "side-scroller-project"}.json`;
  link.click();

  URL.revokeObjectURL(url);
}

export function importProject(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        resolve(normalizeProject(JSON.parse(reader.result)));
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function loadProjectFromIndexedDb() {
  try {
    const db = await openDatabase();

    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(PROJECT_ID);

      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return null;
  }
}

async function saveProjectToIndexedDb(project) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(project, PROJECT_ID);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
