export function getNextMidnight() {
  const d = new Date();
  d.setHours(24, 0, 0, 0);
  return d;
}
