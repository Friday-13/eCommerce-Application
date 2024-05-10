import { BaseComponent, IAttributes } from './base-component';

export interface IFormAttributes extends IAttributes {
  noValidate?: boolean;
  onSubmit?: (event: Event) => void;
  onInput?: () => void;
}

export class FormComponent extends BaseComponent<HTMLFormElement> {
  constructor(attrs: IFormAttributes) {
    const mergedAttrs = attrs;
    mergedAttrs.tag = attrs.tag ? attrs.tag : 'form';
    super(mergedAttrs);
    if (mergedAttrs.onSubmit) {
      this.onSubmit(mergedAttrs.onSubmit);
    }
    if (mergedAttrs.onInput) {
      this.onInput(mergedAttrs.onInput);
    }
    if (!mergedAttrs.noValidate) {
      this.node.noValidate = true;
    }
  }

  onSubmit(callback: (event: Event) => void) {
    this.node.addEventListener('submit', callback);
  }

  onInput(callback: (event: Event) => void) {
    this.node.addEventListener('input', callback);
  }
}
