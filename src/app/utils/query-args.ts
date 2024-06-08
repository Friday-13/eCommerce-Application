import { ICategoryTreeNode } from './category-tree';
import PairRangeFieldView from './pair-range-field-view';

export type TRangeLimit = number | '*';

interface IFilterData {
  description: string;
  filter: string;
}

function convertPriceLimit(price: TRangeLimit) {
  let centAmpunt = price;
  if (typeof price === 'number') {
    centAmpunt = (centAmpunt as number) * 100;
  }
  return centAmpunt;
}

function createRangeDescription(
  attrname: string,
  minValue: TRangeLimit,
  maxValue: TRangeLimit,
  units?: string
) {
  let description = `${attrname}`;
  if (minValue !== '*') {
    description += ` from ${minValue}`;
  }
  if (maxValue !== '*') {
    description += ` to ${maxValue}`;
  }
  if (units) {
    description += ` ${units}`;
  }
  return description;
}

export function filterPriceRange(minPrice: TRangeLimit, maxPrice: TRangeLimit) {
  const minCentAmount = convertPriceLimit(minPrice);
  const maxCentAmount = convertPriceLimit(maxPrice);
  const filter = `variants.price.centAmount:range (${minCentAmount} to ${maxCentAmount})`;
  const discription = createRangeDescription('price', minPrice, maxPrice, '$');
  const filterData: IFilterData = {
    filter,
    description: discription,
  };
  return filterData;
}

export function filterAttributeRange(
  attrName: string,
  minValue: TRangeLimit,
  maxValue: TRangeLimit
) {
  const filter = `variants.attributes.${attrName}:range (${minValue} to ${maxValue})`;
  const discription = createRangeDescription(attrName, minValue, maxValue);
  const filterData: IFilterData = {
    filter,
    description: discription,
  };
  return filterData;
}

export function prepareRangeFilter(filter: PairRangeFieldView) {
  let preparedMinValue: TRangeLimit = filter.minValue;
  let preparedMaxValue: TRangeLimit = filter.maxValue;

  if (filter.minValue === filter.minLimit) {
    preparedMinValue = '*';
  }

  if (filter.maxValue === filter.maxLimit) {
    preparedMaxValue = '*';
  }
  return { preparedMinValue, preparedMaxValue };
}

export function isRangeFilterActual(filter: PairRangeFieldView) {
  if (
    filter.minValue === filter.minLimit &&
    filter.maxValue === filter.maxLimit
  )
    return false;
  return true;
}

export function categoryFilter(category: ICategoryTreeNode) {
  const filter = `categories.id: subtree("${category.id}")`;
  const discription = `Category: ${category.name}`;
  const filterData: IFilterData = {
    filter,
    description: discription,
  };
  return filterData;
}
