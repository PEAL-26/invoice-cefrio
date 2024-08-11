export function getKey(value: string, obj: object) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  for (let i = 0; i < values.length; i++) {
    if (values[i] == value) return keys[i];
  }

  return null;
}

export function getValue<T extends object>(key: keyof T, obj: T) {
  return obj[key];
}
