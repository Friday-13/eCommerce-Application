import View from '@views/view';
import { IAttributes } from '@components/base-component';
import { IRangeField, RangeFieldView } from './range-field-view';

export default class PairRangeFieldView extends View {
  minRangeView: RangeFieldView;

  maxRangeView: RangeFieldView;

  constructor(
    fieldAttrs: IAttributes,
    minRangeAttrs: IRangeField,
    maxRangeAttrs: IRangeField
  ) {
    super(fieldAttrs);
    this.minRangeView = new RangeFieldView(minRangeAttrs);
    this.maxRangeView = new RangeFieldView(maxRangeAttrs);
    this.appendChild(this.minRangeView);
    this.appendChild(this.maxRangeView);
    this.linkRanges();
  }

  set minValue(value: number) {
    this.minRangeView.value = value;
    this.correctMinValue();
  }

  get minValue() {
    return this.minRangeView.value;
  }

  set maxValue(value: number) {
    this.minRangeView.value = value;
    this.correctMaxValue();
  }

  get maxValue() {
    return this.maxRangeView.value;
  }

  correctMinValue() {
    if (this.minRangeView.value >= this.maxRangeView.value) {
      this.minRangeView.value = this.maxRangeView.value - 10;
    }
  }

  correctMaxValue() {
    if (this.maxRangeView.value <= this.minRangeView.value) {
      this.maxRangeView.value = this.minRangeView.value + 10;
    }
  }

  linkRanges() {
    this.maxRangeView.htmlElement.onchange = () => {
      this.correctMaxValue();
    };
    this.minRangeView.htmlElement.onchange = () => {
      this.correctMinValue();
    };
  }
}
