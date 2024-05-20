import { CustomerDraft } from '@commercetools/platform-sdk';
import { IAttributes } from '@components/base-component';
import {
  ButtonComponent,
  IButtonAttributes,
} from '@components/button-component';
import { FormComponent, IFormAttributes } from '@components/form-component';
import { IInputAttributes } from '@components/input-component';
import {
  IInputFieldAttributes,
  InputFieldComponent,
} from '@components/input-field-component';
import { ILabelAttriubutes } from '@components/label-component';
import registration from '@services/customer-registration';
import { IFormInputField, createInputField } from '@utils/create-input-field';
import birthdayLimitation from '@utils/validators/age-validator';
import atLeastOneCharacter from '@utils/validators/at-least-one-character-validator';
import noSpecialCharacterOrNumber from '@utils/validators/no-special-characters-or-numbers-validator';
import View from '@views/view';
import { Datepicker } from 'materialize-css';
import emailValidator from '@utils/validators/email-validator';
import { passwordValidator } from '@utils/validators/password-validator';
import { FormSectionView } from './form-section';
import AddressSection from './address';

export default class RegistrationView extends View {
  private form = new FormComponent({});

  private credentialsSection = new FormSectionView();

  private pesonalSection = new FormSectionView();

  private shippingAddressSection = new AddressSection('');

  private billingAddressSection = new AddressSection('');

  private emailInput = new InputFieldComponent({}, {}, {});

  private passwordInput = new InputFieldComponent({}, {}, {});

  private firstNameInput = new InputFieldComponent({}, {}, {});

  private secondNameInput = new InputFieldComponent({}, {}, {});

  private birthdayInput = new InputFieldComponent({}, {}, {});

  private submitButton = new ButtonComponent({});

  constructor() {
    const attrs: IAttributes = {
      classList: 'row',
    };
    super(attrs);
    this.addForm();
    this.addCredentials();
    this.addPersonalInformation();
    this.addShippingAddress();
    this.addBillingAddress();
    this.addSubmitButton();
  }

  private addForm() {
    const attrs: IFormAttributes = {
      classList: 'col s6',
      onInput: () => {
        this.isValid();
      },
      noValidate: true,
    };
    this.form = new FormComponent(attrs);
    this.appendChild(this.form);
  }

  private addCredentials() {
    this.credentialsSection = new FormSectionView('Credentials');
    this.addEmailInput();
    this.addPasswordInput();
    this.credentialsSection.appendChild(this.emailInput);
    this.credentialsSection.appendChild(this.passwordInput);
    this.form.node.appendChild(this.credentialsSection.htmlElement);
  }

  private addPersonalInformation() {
    this.pesonalSection = new FormSectionView('Personal Information');
    this.addFirstNameInput();
    this.addSecondNameInput();
    this.addBirthdateInput();
    this.pesonalSection.appendChild(this.firstNameInput);
    this.pesonalSection.appendChild(this.secondNameInput);
    this.pesonalSection.appendChild(this.birthdayInput);
    this.form.node.appendChild(this.pesonalSection.htmlElement);
  }

  private addShippingAddress() {
    this.shippingAddressSection = new AddressSection('Shipping Address');
    this.form.node.appendChild(this.shippingAddressSection.htmlElement);
  }

  private addBillingAddress() {
    this.billingAddressSection = new AddressSection('Billing Address');
    this.form.node.appendChild(this.billingAddressSection.htmlElement);
  }

  private addEmailInput() {
    const fieldAttrs: IFormInputField = {
      label: 'E-mail',
      id: 'email',
      placeholder: 'Ivan@mail.com',
      type: 'email',
      customValidators: [emailValidator],
    };
    this.emailInput = createInputField(fieldAttrs);
  }

  private addPasswordInput() {
    const fieldAttrs: IFormInputField = {
      label: 'Password',
      id: 'pass',
      placeholder: 'Super secret password',
      type: 'password',
      customValidators: [passwordValidator],
    };
    this.passwordInput = createInputField(fieldAttrs);
  }

  private addFirstNameInput() {
    const fieldAttrs: IFormInputField = {
      label: 'First Name',
      id: 'first-name',
      type: 'text',
      placeholder: 'John',
      customValidators: [atLeastOneCharacter, noSpecialCharacterOrNumber],
    };
    this.firstNameInput = createInputField(fieldAttrs);
  }

  private addSecondNameInput() {
    const fieldAttrs: IFormInputField = {
      label: 'Second Name',
      id: 'second-name',
      type: 'text',
      placeholder: 'Doe',
      customValidators: [atLeastOneCharacter, noSpecialCharacterOrNumber],
    };
    this.secondNameInput = createInputField(fieldAttrs);
  }

  private addBirthdateInput() {
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
    Datepicker.init(this.birthdayInput.input.node, {
      minDate: new Date('1900-01-01T00:00:00'),
      maxDate: new Date(),
      defaultDate: new Date('1984-11-01'),
      yearRange: 100,
      onClose: () => {
        this.birthdayInput.isValid();
      },
      format: 'yyyy-mm-dd',
    });
  }

  private addSubmitButton() {
    const attrs: IButtonAttributes = {
      type: 'button',
      content: 'Sign Up',
      tag: 'button',
      disabled: true,
      onClick: () => {
        this.submitForm();
      },
    };
    this.submitButton = new ButtonComponent(attrs);
    this.submitButton.addClass('col');
    this.submitButton.addClass('s6');
    this.submitButton.addClass('offset-s3');
    this.form.appendChild(this.submitButton);
  }

  isValid() {
    const inputs = [
      this.emailInput,
      this.passwordInput,
      this.firstNameInput,
      this.secondNameInput,
      this.birthdayInput,
      this.shippingAddressSection,
      this.billingAddressSection,
    ];
    const isValid = inputs.reduce(
      (result, value) => result && value.isValid(),
      true
    );
    if (isValid) {
      this.submitButton.disabled = false;
    }
    return isValid;
  }

  submitForm() {
    if (!this.isValid()) {
      RegistrationView.showErrorMessage('Form invalid');
      return;
    }
    const addresses = [];
    if (this.shippingAddressSection.isEnable) {
      addresses.push(this.shippingAddressSection.address);
    }
    if (this.billingAddressSection.isEnable) {
      addresses.push(this.billingAddressSection.address);
    }
    const customerData: CustomerDraft = {
      email: this.emailInput.input.value,
      password: this.passwordInput.input.value,
      firstName: this.firstNameInput.input.value,
      lastName: this.secondNameInput.input.value,
      dateOfBirth: this.birthdayInput.input.value,
      addresses,
    };
    /* TODO: add login and redirect */
    registration(
      customerData,
      RegistrationView.showSucessMessage,
      RegistrationView.showErrorMessage
    );
  }

  static showSucessMessage(message: string) {
    M.toast({
      html: message,
      classes: 'lime accent-2 black-text',
    });
  }

  static showErrorMessage(message: string) {
    M.toast({ html: message });
  }
}
