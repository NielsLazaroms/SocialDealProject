export const all_deals_key = 'alle_deals';

const filter = createFilter<{ header?: { category?: { key?: string } } }, string>({
  key: 'category',
  arrayFilter(items, value) {
    const v = (value ?? '').toString().trim().toLowerCase();

    if (!v || v === all_deals_key) return items;

    return items.filter((it) => {
      const category = (it.header?.category?.key ?? '').toString().trim().toLowerCase();
      return category === v;
    });
  },
  label(value) {
    return value ? `Categorie: ${value}` : '';
  },
});

export default filter;
