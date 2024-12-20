export function getFirstAndLastNameInitials(name = '') {
  if (!name) return '';

  const namesParts = name.split(' ');
  if (namesParts.length === 0) return '';

  let initials = '';

  if (namesParts[0].length === 0) return '';
  initials += namesParts[0][0].toUpperCase();

  if (namesParts.length > 1) {
    initials += namesParts[namesParts.length - 1][0].toUpperCase();
  }

  return initials;
}

export function formatNumberWithLeadingZeros(number: number, length = 5): string {
  return number.toString().padStart(length, '0');
}
