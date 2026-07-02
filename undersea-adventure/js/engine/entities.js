export const DEFAULT_PROPERTY_KEYS = [
  "width",
  "height",
  "color",
  "collision",
  "scoreValue",
  "sound",
  "spriteId",
  "flipX",
  "followCharacter",
  "followAngleMin",
  "followAngleMax",
  "followDistanceMin",
  "followDistanceMax",
];

export function resolveEntityProperties(project, entity) {
  if (entity.propertyMode === "custom") {
    return entity;
  }

  const defaults = project.objectDefaults?.[entity.type] ?? {};

  return {
    ...entity,
    ...Object.fromEntries(
      DEFAULT_PROPERTY_KEYS.map((key) => [key, defaults[key] ?? entity[key]]),
    ),
  };
}

export function getDefaultProperties(definition) {
  return Object.fromEntries(
    DEFAULT_PROPERTY_KEYS.map((key) => [key, definition[key] ?? getFallbackValue(key)]),
  );
}

function getFallbackValue(key) {
  if (key === "color") return "#94a3b8";
  if (key === "collision") return "none";
  if (key === "sound") return "";
  if (key === "spriteId") return "";
  if (key === "flipX") return false;
  if (key === "followCharacter") return false;
  if (key === "followAngleMin") return 0;
  if (key === "followAngleMax") return 360;
  if (key === "followDistanceMin") return 48;
  if (key === "followDistanceMax") return 0;
  return 0;
}
