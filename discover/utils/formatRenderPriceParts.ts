type RenderPart = { kind: 'text'; value: string } | { kind: 'fraction'; value: string };

export const formatPricePartsToRenderParts = (parts: Intl.NumberFormatPart[]): RenderPart[] => {
  const decimal = parts.find((part) => part.type === 'decimal')?.value ?? '';
  const fraction = parts.find((part) => part.type === 'fraction')?.value ?? '';

  const renderParts: RenderPart[] = [];

  for (const part of parts) {
    if (part.type === 'decimal') continue;

    if (part.type === 'fraction') {
      if (fraction && fraction !== '00') {
        renderParts.push({ kind: 'fraction', value: `${decimal}${fraction}` });
      }
      continue;
    }

    renderParts.push({ kind: 'text', value: part.value });
  }

  return renderParts;
};
