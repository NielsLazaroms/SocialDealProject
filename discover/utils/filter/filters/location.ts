const filter = createFilter<
  { companyInformation?: { location?: string }; location?: string; city?: string },
  string
>({
  key: 'location',
  arrayFilter(items, value) {
    const v = (value ?? '').toString().trim().toLowerCase();
    if (!v) return items;

    return items.filter((it) => {
      const city = (it.companyInformation?.location ?? it.location ?? it.city ?? '')
        .toString()
        .trim()
        .toLowerCase();
      return city === v;
    });
  },
  label(value) {
    return value ? `Locatie: ${value}` : '';
  },
});

export default filter;
