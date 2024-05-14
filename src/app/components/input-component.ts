import { BaseComponent, IAttributes } from './base-component';

export interface IInputAttributes extends IAttributes {
  type?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export class InputComponent extends BaseComponent<HTMLInputElement> {
  constructor(attrs: IInputAttributes) {
    const mergedAttrs = attrs;
    mergedAttrs.tag = attrs.tag ? attrs.tag : 'input';
    mergedAttrs.classList = attrs.classList ? attrs.classList : 'validate';
    super(mergedAttrs);
    mergedAttrs.type = attrs.type ? attrs.type : 'text';
    if (mergedAttrs.id) {
      this.node.id = mergedAttrs.id;
    }

    if (mergedAttrs.required) {
      this.node.required = true;
    }

    if (mergedAttrs.disabled) {
      this.node.disabled = true;
    }

    if (mergedAttrs.placeholder) {
      this.node.placeholder = mergedAttrs.placeholder;
    }

    if (mergedAttrs.type) {
      this.node.type = mergedAttrs.type;
    }
  }

  setDisable(disable: boolean) {
    this.node.disabled = disable;
  }

  clear() {
    this.node.value = '';
  }

  get value() {
    return this.node.value;
  }

  set value(newValue: string) {
    this.node.value = newValue;
  }

  get type() {
    return this.node.type;
  }

  set type(newType: string) {
    this.node.type = newType;
  }
}
