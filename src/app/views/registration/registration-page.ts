import { BaseComponent, IAttributes } from '@components/base-component';
import { FormComponent, IFormAttributes } from '@components/form-component';
import { IInputAttributes } from '@components/input-component';
import {
  IInputFieldAttributes,
  InputFieldComponent,
} from '@components/input-field-component';
import { ILabelAttriubutes, LabelComponent } from '@components/label-component';
import {
  IOptionAttributes,
  OptionComponent,
} from '@components/option-component';
import { IValidator } from '@components/validator';
import View from '@views/view';
import { Datepicker, FormSelect } from 'materialize-css';

interface IFormInputField {
  id: string;
  placeholder: string;
  label: string;
  type: string;
  customValidators: Array<IValidator>;
}

export default class RegistrationView extends View {
  private form = new FormComponent({});

  private emailInput = new InputFieldComponent({}, {}, {});

  private passwordInput = new InputFieldComponent({}, {}, {});

  private firstNameInput = new InputFieldComponent({}, {}, {});

  private secondNameInput = new InputFieldComponent({}, {}, {});

  private birthdayInput = new InputFieldComponent({}, {}, {});

  private birthdayInstance = Datepicker.init({} as Element, {});

  private streetInput = new InputFieldComponent({}, {}, {});

  private cityInput = new InputFieldComponent({}, {}, {});

  private postalCodeInput = new InputFieldComponent({}, {}, {});

  private countryInput = new BaseComponent({});

  constructor() {
    const attrs: IAttributes = {
      classList: 'row',
    };
    super(attrs);
    this.addForm();
    this.addEmailInput();
    this.addPasswordInput();
    this.addFirstNameInput();
    this.addSecondNameInput();
    this.addBirthdateInput();
    this.addStreetInput();
    this.addCityInput();
    this.addPostalCodeInput();
    this.addCountryInput();
  }

  addForm() {
    const attrs: IFormAttributes = {
      classList: 'col s6',
      onInput: () => {
        console.log('Form input');
      },
      onSubmit: () => {
        console.log('form submit');
      },
      noValidate: true,
    };
    this.form = new FormComponent(attrs);
    this.appendChild(this.form);
  }

  static createInputField(fieldAttrs: IFormInputField) {
    const attrs: IInputFieldAttributes = {
      customValidators: fieldAttrs.customValidators,
    };
    const inputAttrs: IInputAttributes = {
      type: fieldAttrs.type,
      placeholder: fieldAttrs.placeholder,
    };
    const labelAttrs: ILabelAttriubutes = {
      for: fieldAttrs.id,
      content: fieldAttrs.label,
    };
    return new InputFieldComponent(attrs, labelAttrs, inputAttrs);
  }

  addEmailInput() {
    const fieldAttrs: IFormInputField = {
      label: 'E-mail',
      id: 'email',
      placeholder: 'Ivan@mail.com',
      type: 'email',
      customValidators: [],
    };
    this.emailInput = this.createInputField(fieldAttrs);
    this.form.appendChild(this.emailInput);
  }

  addPasswordInput() {
    const fieldAttrs: IFormInputField = {
      label: 'Password',
      id: 'pass',
      placeholder: 'Super secret password',
      type: 'password',
      customValidators: [],
    };
    this.passwordInput = this.createInputField(fieldAttrs);
    this.form.appendChild(this.passwordInput);
  }

  addFirstNameInput() {
    const fieldAttrs: IFormInputField = {
      label: 'First Name',
      id: 'first-name',
      type: 'text',
      placeholder: 'John',
      customValidators: [],
    };
    this.firstNameInput = this.createInputField(fieldAttrs);
    this.form.appendChild(this.firstNameInput);
  }

  addSecondNameInput() {
    const fieldAttrs: IFormInputField = {
      label: 'Second Name',
      id: 'second-name',
      type: 'text',
      placeholder: 'Doe',
      customValidators: [],
    };
    this.secondNameInput = this.createInputField(fieldAttrs);
    this.form.appendChild(this.secondNameInput);
  }

  addBirthdateInput() {
    const fieldAttrs: IFormInputField = {
      label: 'Birthdate',
      id: 'birthdate',
      type: 'text',
      placeholder: 'Birthday',
      customValidators: [],
    };

    const attrs: IInputFieldAttributes = {
      customValidators: fieldAttrs.customValidators,
    };
    const inputAttrs: IInputAttributes = {
      type: fieldAttrs.type,
      placeholder: fieldAttrs.placeholder,
      classList: 'datepicker',
    };
    const labelAttrs: ILabelAttriubutes = {
      for: fieldAttrs.id,
      content: fieldAttrs.label,
    };

    this.birthdayInput = new InputFieldComponent(attrs, labelAttrs, inputAttrs);
    this.form.appendChild(this.birthdayInput);
    this.birthdayInstance = Datepicker.init(this.birthdayInput.input.node, {
      onSelect: () => {
        console.log(this.birthdayInstance.date);
      },
    });
  }

  addStreetInput() {
    const attrs: IFormInputField = {
      id: 'street',
      type: 'text',
      label: 'Street',
      placeholder: 'Dan Crescent',
      customValidators: [],
    };
    this.streetInput = this.createInputField(attrs);
    this.form.appendChild(this.streetInput);
  }

  addCityInput() {
    const attrs: IFormInputField = {
      id: 'city',
      type: 'text',
      label: 'City',
      placeholder: 'Lake Jeremyville',
      customValidators: [],
    };
    this.cityInput = this.createInputField(attrs);
    this.form.appendChild(this.cityInput);
  }

  addPostalCodeInput() {
    const attrs: IFormInputField = {
      id: 'postal-code',
      type: 'text',
      label: 'Postal code',
      placeholder: '2154',
      customValidators: [],
    };
    this.postalCodeInput = this.createInputField(attrs);
    this.form.appendChild(this.postalCodeInput);
  }

  addCountryInput() {
    const inputFieldAttrs: IAttributes = {
      classList: ['input-field', 'col', 's6'],
    };
    const labelAttrs: ILabelAttriubutes = {
      content: 'Country',
    };

    const inputFieldComponent = new BaseComponent(inputFieldAttrs);
    const selectComponent = new BaseComponent({ tag: 'select' });
    const labelComponent = new LabelComponent(labelAttrs);
    labelComponent.removeClass('active');

    inputFieldComponent.appendChild(selectComponent);
    inputFieldComponent.appendChild(labelComponent);

    const options = ['Russia', 'UK', 'USA'];

    const placeholderOptionAttrs: IOptionAttributes = {
      content: 'Select country',
      value: '',
      disable: true,
      selected: true,
    };
    const placeholderOption = new OptionComponent(placeholderOptionAttrs);
    selectComponent.appendChild(placeholderOption);
    options.forEach((value, index) => {
      const optionAttrs: IOptionAttributes = {
        content: value,
        value: `${index + 1}`,
      };
      const optionComponent = new OptionComponent(optionAttrs);
      selectComponent.appendChild(optionComponent);
    });
    this.countryInput = inputFieldComponent;
    this.form.appendChild(this.countryInput);
    document.addEventListener('DOMContentLoaded', () => {
      FormSelect.init(selectComponent.node, {});
    });
  }
}
