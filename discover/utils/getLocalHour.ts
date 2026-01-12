/**
 * Returns the local hour for a given date using the system locale and timezone.
 *
 * @param date - Date to resolve the hour for. Defaults to the current date/time.
 * @returns The resolved local hour in 24-hour format (0–23).
 */

export function getLocalHour(date: Date = new Date()): number {
  const hourStr = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    hour12: false,
  }).format(date);

  return Number(hourStr);
}
