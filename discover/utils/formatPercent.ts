export const formatPercent = (value: number, locale = 'nl-NL') => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(value);
};
