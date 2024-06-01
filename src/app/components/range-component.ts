import { IInputAttributes, InputComponent } from './input-component';

export interface IRangeAttributes extends IInputAttributes {
  min?: number;
  max?: number;
}

export class RangeComponent extends InputComponent {
  constructor(attrs: IRangeAttributes) {
    const mergedAttrs: IRangeAttributes = { ...attrs };
    mergedAttrs.type = attrs.type ? attrs.type : 'range';
    super(mergedAttrs);
    this.min = attrs.min === undefined ? 0 : attrs.min;
    this.max = attrs.max === undefined ? 100 : attrs.max;
    if (attrs.value) {
      this.value = attrs.value;
    }
  }

  set min(value: number) {
    this.node.setAttribute('min', `${value}`);
  }

  get min() {
    return Number(this.node.getAttribute('min'));
  }

  set max(value: number) {
    // if (value <= this.min) return;
    this.node.setAttribute('max', `${value}`);
  }

  get max() {
    return Number(this.node.getAttribute('max'));
  }
}
