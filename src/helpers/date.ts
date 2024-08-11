export function stringToDate(dateStr?: string | null | undefined) {
  if (!dateStr) return undefined;
  if (!dateStr.trim()) return undefined;
  if (dateStr.trim().length === 0) return undefined;

  const dateSplit = dateStr.split('/');
  const day = dateSplit[0];
  const month = dateSplit[1];
  const year = dateSplit[2];

  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function toDate(year?: string, month?: string, day?: string) {
  if (!month || !year || !day) return undefined;

  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function dateConcatTime(date: Date, time: string) {
  if (!date || !time) return undefined;

  const timeSplitted = time.split(':');
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    parseInt(timeSplitted[0]),
    parseInt(timeSplitted[1]),
  );
}

export function toTimeString(date?: string | Date | null) {
  if (!date) return undefined;
  const time = new Date(date).toLocaleTimeString().split(':');
  return `${time[0]}:${time[1]}`;
}

export function subtractDate(value: number, type: 'day' | 'month' | 'year') {
  // Get the current date
  var currentDate = new Date();

  if (type === 'day') currentDate.setDate(currentDate.getDate() - value);
  if (type === 'month') currentDate.setMonth(currentDate.getMonth() - value);
  if (type === 'year') currentDate.setFullYear(currentDate.getFullYear() - value);

  return currentDate;
}

export function addDate(value: number, type: 'day' | 'month' | 'year') {
  // Get the current date
  var currentDate = new Date();

  if (type === 'day') currentDate.setDate(currentDate.getDate() + value);
  if (type === 'month') currentDate.setMonth(currentDate.getMonth() + value);
  if (type === 'year') currentDate.setFullYear(currentDate.getFullYear() + value);

  return currentDate;
}
