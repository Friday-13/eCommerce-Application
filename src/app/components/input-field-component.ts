import { IValidator } from '@utils/validators/validator';
import { BaseComponent, IAttributes } from './base-component';
import { IInputAttributes, InputComponent } from './input-component';
import { ILabelAttriubutes, LabelComponent } from './label-component';

export interface IInputFieldAttributes extends IAttributes {
  customValidators?: Array<IValidator>;
}

export class InputFieldComponent extends BaseComponent {
  protected _input: InputComponent = new InputComponent({});

  protected _label: LabelComponent = new LabelComponent({});

  protected _helper: BaseComponent = new BaseComponent({});

  validators?: Array<IValidator>;

  validationMessages: Array<string>;

  htmlElement: HTMLElement;

  constructor(
    attrs: IInputFieldAttributes,
    labelAttrs: ILabelAttriubutes,
    inputAttrs: IInputAttributes
  ) {
    const mergedAttrs = attrs;
    mergedAttrs.classList = attrs.classList
      ? attrs.classList
      : ['input-field', 'col', 's6'];
    super(attrs);
    this.addInputComponent(inputAttrs);
    this.addLabelComponent(labelAttrs);
    this.addHelperComponent();

    if (mergedAttrs.customValidators && mergedAttrs.customValidators.length) {
      this.setValidators(mergedAttrs.customValidators);
    }
    this.validationMessages = [];
    this.htmlElement = this.node;
  }

  protected addInputComponent(attrs: IInputAttributes) {
    this._input = new InputComponent(attrs);
    this.appendChild(this._input);
  }

  protected addLabelComponent(attrs: ILabelAttriubutes) {
    this._label = new LabelComponent(attrs);
    this.appendChild(this._label);
  }

  protected addHelperComponent() {
    const attrs: IAttributes = {
      tag: 'div',
      classList: 'red-text',
      content: '',
    };
    this._helper = new BaseComponent(attrs);
    this.appendChild(this._helper);
  }

  get input() {
    return this._input;
  }

  get label() {
    return this._label;
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
    const isValid = validator.validateFunction(this._input.node.value);
    if (!isValid) {
      this.pushMessage(validator.invalidMessage);
    }
    return isValid;
  }

  pushMessage(message: string) {
    this.validationMessages.push(message);
    if (this._helper.textContent === '') {
      this._helper.textContent = message;
    } else {
      this._helper.textContent += `; ${message}`;
    }
  }

  clearMessages() {
    this.validationMessages = [];
    this._helper.textContent = '';
  }

  togglePasswordVisibility() {
    if (this._input.node.getAttribute('type') === 'password') {
      this._input.node.setAttribute('type', 'text');
    } else {
      this._input.node.setAttribute('type', 'password');
    }
  }

  getValue(): string {
    return this._input.value;
  }

  setValue(value: string | undefined) {
    if (value !== undefined) {
      this._input.value = value;
    }
  }
}
