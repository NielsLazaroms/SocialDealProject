export function formatActiveCategoryTitle(label: string, isAllCategory: boolean) {
  if (isAllCategory) {
    return 'Alle deals bij jou in de buurt';
  }

  return `${label} deals bij jou in de buurt`;
}
