type TPriceLimit = number | '*';

function convertPriceLimit(price: TPriceLimit) {
  let centAmpunt = price;
  if (typeof price === 'number') {
    centAmpunt = (centAmpunt as number) * 100;
  }
  return centAmpunt;
}

export function filterPriceRange(minPrice: TPriceLimit, maxPrice: TPriceLimit) {
  const minCentAmount = convertPriceLimit(minPrice);
  const maxCentAmount = convertPriceLimit(maxPrice);
  return `variants.price.centAmount:range (${minCentAmount} to ${maxCentAmount})`;
}

export function filterAttributeRange(
  attrName: string,
  minValue: number,
  maxValue: number
) {
  return `variants.attributes.${attrName}:range (${minValue} to ${maxValue})`;
}
