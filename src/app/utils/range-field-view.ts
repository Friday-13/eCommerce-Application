import { BaseComponent, IAttributes } from '@components/base-component';
import { IRangeAttributes, RangeComponent } from '@components/range-component';
import View from '@views/view';
import { Range } from 'materialize-css';
import initMaterializeComponent from './materilalize-js-init';

export interface IRangeField {
  fieldAttrs: IAttributes;
  rangeAttrs: IRangeAttributes;
  labelText: string;
}

export class RangeFieldView extends View {
  rangeInput = new RangeComponent({});

  constructor(attrs: IRangeField) {
    super(attrs.fieldAttrs);
    this.htmlElement.classList.add('range-field');
    this.addRangeComponent(attrs.rangeAttrs);
    this.addLabel(attrs.labelText);
  }

  addRangeComponent(rangeAttrs: IRangeAttributes) {
    this.rangeInput = new RangeComponent(rangeAttrs);
    this.appendChild(this.rangeInput);

    initMaterializeComponent('input', this.htmlElement, () => {
      Range.init(this.rangeInput.node);
    });
  }

  addLabel(text: string) {
    const attrs: IAttributes = {
      classList: 'active',
      tag: 'label',
      content: text,
    };
    const label = new BaseComponent(attrs);
    this.appendChild(label);
  }

  get value() {
    return Number(this.rangeInput.value);
  }

  set value(newValue: number) {
    if (newValue > this.rangeInput.max) return;
    if (newValue < this.rangeInput.min) return;
    this.rangeInput.value = `${newValue}`;
  }

  get min() {
    return Number(this.rangeInput.min);
  }

  get max() {
    return Number(this.rangeInput.max);
  }
}
