export const regexPhone = /^(\d{3})\s(\d{3})\s(\d{3})$/;

export const phoneTransform = (value: string) => value.replace(' ', '').trim();
