import { BaseComponent, IAttributes } from './base-component';
// import { ButtonComponent } from './button-component';
import { IInputAttributes, InputComponent } from './input-component';
import { ILabelAttriubutes, LabelComponent } from './label-component';
import { IValidator } from './validator';

export interface IInputFieldAttributes extends IAttributes {
  customValidators?: Array<IValidator>;
}

export class InputFieldComponent extends BaseComponent {
  #input: InputComponent = new InputComponent({});

  #label: LabelComponent = new LabelComponent({});

  #helper: BaseComponent = new BaseComponent({});

  validators?: Array<IValidator>;

  validationMessages: Array<string>;

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
  }

  protected addInputComponent(attrs: IInputAttributes) {
    this.#input = new InputComponent(attrs);
    this.appendChild(this.#input);
  }

  protected addLabelComponent(attrs: ILabelAttriubutes) {
    this.#label = new LabelComponent(attrs);
    this.appendChild(this.#label);
  }

  protected addHelperComponent() {
    const attrs: IAttributes = {
      tag: 'span',
      classList: 'helper-text',
      content: '',
    };
    this.#helper = new BaseComponent(attrs);
    this.appendChild(this.#helper);
  }

  get input() {
    return this.#input;
  }

  get label() {
    return this.#label;
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
    const isValid = validator.validateFunction(this.#input.node.value);
    if (!isValid) {
      this.pushMessage(validator.invalidMessage);
    }
    return isValid;
  }

  pushMessage(message: string) {
    this.validationMessages.push(message);
    if (this.#helper.textContent === '') {
      this.#helper.textContent = message;
    } else {
      this.#helper.textContent += `; ${message}`;
    }
  }

  clearMessages() {
    this.validationMessages = [];
    this.#helper.textContent = '';
  }

  togglePasswordVisibility() {
    if (this.#input.node.getAttribute('type') === 'password') {
      this.#input.node.setAttribute('type', 'text');
    } else {
      this.#input.node.setAttribute('type', 'password');
    }
  }
}
