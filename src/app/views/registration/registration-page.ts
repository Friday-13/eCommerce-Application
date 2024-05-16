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
import { IFormInputField, createInputField } from '@utils/create-input-field';
import birthdayLimitation from '@utils/validators/age-validator';
import atLeastOneCharacter from '@utils/validators/at-least-one-character-validator';
import noSpecialCharacterOrNumber from '@utils/validators/no-special-characters-or-numbers-validator';
import {
  postalCodeNoCountryValidator,
  postalCodeUKValidator,
  postalCodeUSSRValidator,
} from '@utils/validators/post-code-validator';
import { IValidator } from '@utils/validators/validator';
import View from '@views/view';
import { Datepicker, FormSelect } from 'materialize-css';

export default class RegistrationView extends View {
  private form = new FormComponent({});

  private emailInput = new InputFieldComponent({}, {}, {});

  private passwordInput = new InputFieldComponent({}, {}, {});

  private firstNameInput = new InputFieldComponent({}, {}, {});

  private secondNameInput = new InputFieldComponent({}, {}, {});

  private birthdayInput = new InputFieldComponent({}, {}, {});

  private streetInput = new InputFieldComponent({}, {}, {});

  private cityInput = new InputFieldComponent({}, {}, {});

  private postalCodeInput = new InputFieldComponent({}, {}, {});

  private countryInput = new BaseComponent({});

  private countrySelector: FormSelect;

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
    this.addCountryInput();
    this.addPostalCodeInput();
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

  addEmailInput() {
    const fieldAttrs: IFormInputField = {
      label: 'E-mail',
      id: 'email',
      placeholder: 'Ivan@mail.com',
      type: 'email',
      customValidators: [],
    };
    this.emailInput = createInputField(fieldAttrs);
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
    this.passwordInput = createInputField(fieldAttrs);
    this.form.appendChild(this.passwordInput);
  }

  addFirstNameInput() {
    const fieldAttrs: IFormInputField = {
      label: 'First Name',
      id: 'first-name',
      type: 'text',
      placeholder: 'John',
      customValidators: [atLeastOneCharacter, noSpecialCharacterOrNumber],
    };
    this.firstNameInput = createInputField(fieldAttrs);
    this.form.appendChild(this.firstNameInput);
  }

  addSecondNameInput() {
    const fieldAttrs: IFormInputField = {
      label: 'Second Name',
      id: 'second-name',
      type: 'text',
      placeholder: 'Doe',
      customValidators: [atLeastOneCharacter, noSpecialCharacterOrNumber],
    };
    this.secondNameInput = createInputField(fieldAttrs);
    this.form.appendChild(this.secondNameInput);
  }

  addBirthdateInput() {
    const fieldAttrs: IFormInputField = {
      label: 'Birthdate',
      id: 'birthdate',
      type: 'text',
      placeholder: 'Birthday',
      customValidators: [birthdayLimitation],
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
    Datepicker.init(this.birthdayInput.input.node, {
      minDate: new Date('1900-01-01T00:00:00'),
      maxDate: new Date(),
      yearRange: 100,
      onClose: () => {
        this.birthdayInput.isValid();
      },
    });
  }

  addStreetInput() {
    const attrs: IFormInputField = {
      id: 'street',
      type: 'text',
      label: 'Street',
      placeholder: 'Dan Crescent',
      customValidators: [atLeastOneCharacter],
    };
    this.streetInput = createInputField(attrs);
    this.form.appendChild(this.streetInput);
  }

  addCityInput() {
    const attrs: IFormInputField = {
      id: 'city',
      type: 'text',
      label: 'City',
      placeholder: 'Lake Jeremyville',
      customValidators: [atLeastOneCharacter, noSpecialCharacterOrNumber],
    };
    this.cityInput = createInputField(attrs);
    this.form.appendChild(this.cityInput);
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

    const options = ['Russia', 'United Kingdom', 'Belarus'];

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
      this.countrySelector = FormSelect.init(selectComponent.node, {});
    });
  }

  addPostalCodeInput() {
    const attrs: IFormInputField = {
      id: 'postal-code',
      type: 'text',
      label: 'Postal code',
      placeholder: '2154',
      customValidators: [this.postalCodeValidator],
    };
    this.postalCodeInput = createInputField(attrs);
    this.form.appendChild(this.postalCodeInput);
  }

  private postalCodeValidator: IValidator = {
    invalidMessage: 'incorrect postal code',
    validateFunction: this.postalCodeValidateFunction.bind(this),
  };

  postalCodeValidateFunction(value: string): boolean {
    const country = this.countrySelector.input.value;
    switch (country) {
      case 'Russia':
        return postalCodeUSSRValidator.validateFunction(value);
      case 'United Kingdom':
        return postalCodeUKValidator.validateFunction(value);
      case 'Belarus':
        return postalCodeUSSRValidator.validateFunction(value);
      default:
        return postalCodeNoCountryValidator.validateFunction(value);
    }
  }
}
