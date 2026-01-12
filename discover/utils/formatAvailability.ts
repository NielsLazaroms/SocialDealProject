const weekdays: WeekdayKey[] = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];

export const formatAvailability = (availability?: WeekdayKey[], locale = 'nl-NL') => {
  if (!availability?.length) return [];

  const now = new Date();
  const todayIndex = now.getDay();
  const todayKey = weekdays[todayIndex];
  const tomorrowKey = weekdays[(todayIndex + 1) % 7];

  const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });

  return availability.map((day) => {
    if (day === todayKey) return 'Vandaag';
    if (day === tomorrowKey) return 'Morgen';

    const offset = (weekdays.indexOf(day) - todayIndex + 7) % 7 || 7;
    const d = new Date(now);
    d.setDate(now.getDate() + offset);

    return fmt.format(d);
  });
};
