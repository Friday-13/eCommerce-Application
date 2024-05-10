import { BaseComponent, IAttributes } from './base-component';
import { IValidator } from './validator';

export interface IInputAttributes extends IAttributes {
  type?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  customValidators?: Array<IValidator>;
}

export class InputComponent extends BaseComponent<HTMLInputElement> {
  validators?: Array<IValidator>;

  validationMessage: Array<string>;

  constructor(attrs: IInputAttributes) {
    const mergedAttrs = attrs;
    mergedAttrs.tag = attrs.tag ? attrs.tag : 'input';
    super(mergedAttrs);
    if (mergedAttrs.type) {
      this.node.type = mergedAttrs.type;
    }
    if (mergedAttrs.id) {
      this.node.id = mergedAttrs.id;
    }
    if (mergedAttrs.required) {
      this.node.required = true;
    }

    if (mergedAttrs.customValidators && mergedAttrs.customValidators.length) {
      this.setValidators(mergedAttrs.customValidators);
    }

    if (mergedAttrs.disabled) {
      this.node.disabled = true;
    }
    this.validationMessage = [];
  }

  setValidators(validators: Array<IValidator>) {
    this.validators = validators;
    this.node.addEventListener('input', this.isValid.bind(this));
  }

  isValid(): boolean {
    if (!this.validators || !this.validators.length) {
      return true;
    }
    this.clearMessages();
    const isAllValid = this.validators.reduce(
      (result, validator) => this.checkValidator(validator) && result,
      true
    );
    return isAllValid;
  }

  checkValidator(validator: IValidator): boolean {
    const isValid = validator.validateFunction(this.node.value);
    if (!isValid) {
      this.pushMessage(validator.invalidMessage);
    }
    return isValid;
  }

  pushMessage(message: string) {
    this.validationMessage.push(message);
  }

  clearMessages() {
    this.validationMessage = [];
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
}
