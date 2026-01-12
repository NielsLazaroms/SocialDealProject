const filter = createFilter<{ detailRow?: { rating?: { ratingNumber?: number } } }, string | null>({
  key: 'rating',

  init(defaultValue) {
    if (defaultValue == null) return null;
    if (typeof defaultValue === 'string') return defaultValue;
    if (typeof defaultValue === 'number') return String(defaultValue);
    return null;
  },

  arrayFilter(items, value) {
    if (value == null || value === '' || value === 'none') return items;

    const minRating = Number(value);
    if (!Number.isFinite(minRating)) return items;

    return items.filter((it) => {
      const rating = it.detailRow?.rating?.ratingNumber;
      return rating != null && rating >= minRating;
    });
  },
  label(value) {
    return value != null ? `Rating: ${value}+` : '';
  },
});

export default filter;
