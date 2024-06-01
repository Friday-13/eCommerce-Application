import { IAttributes } from '@components/base-component';
import PairRangeFieldView from './pair-range-field-view';
import { IRangeField } from './range-field-view';

export default function createPairRangeField(
  minValue: number,
  maxValue: number
) {
  const fieldAttrs: IAttributes = {
    classList: 'col s12 m8 offset-m2',
  };

  const minRangeAttrs: IRangeField = {
    fieldAttrs: {},
    labelText: 'min',
    rangeAttrs: {
      value: `${minValue}`,
      min: minValue,
      max: maxValue,
    },
  };

  const maxRangeAttrs: IRangeField = {
    fieldAttrs: {},
    labelText: 'max',
    rangeAttrs: {
      value: `${maxValue}`,
      min: minValue,
      max: maxValue,
    },
  };
  const pairRangeField = new PairRangeFieldView(
    fieldAttrs,
    minRangeAttrs,
    maxRangeAttrs
  );

  return pairRangeField;
}
