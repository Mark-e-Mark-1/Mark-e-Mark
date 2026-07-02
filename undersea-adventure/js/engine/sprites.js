const imageCache = new Map();

export function getSpriteAsset(project, spriteId) {
  if (!spriteId) return null;
  return project.assets?.images?.find((asset) => asset.id === spriteId) ?? null;
}

export function getSpriteImage(asset) {
  if (!asset?.src) return null;

  if (!imageCache.has(asset.id)) {
    const image = new Image();
    image.onload = () => {
      window.dispatchEvent(new CustomEvent("sprite-image-loaded", { detail: { id: asset.id } }));
    };
    image.onerror = () => {
      window.dispatchEvent(new CustomEvent("sprite-image-error", { detail: { id: asset.id } }));
    };
    image.src = asset.src;
    imageCache.set(asset.id, image);
  }

  return imageCache.get(asset.id);
}

export function createImageAsset(file, src) {
  return {
    id: `sprite_${crypto.randomUUID()}`,
    name: file.name.replace(/\.[^.]+$/, ""),
    fileName: file.name,
    src,
  };
}

export function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
