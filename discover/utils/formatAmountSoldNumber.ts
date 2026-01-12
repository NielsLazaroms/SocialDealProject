export const formatAmountSoldNumber = (value: number) => {
  return new Intl.NumberFormat('nl-NL').format(value);
};
