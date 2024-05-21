import { CustomerDraft } from '@commercetools/platform-sdk';
import { BaseComponent, IAttributes } from '@components/base-component';
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
import { CheckboxComponent } from '@components/checkbox-component';
import Router from '@utils/router';
import FormSectionView from './form-section';
import AddressSection from './address';
import styles from './registration-page.module.scss';

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

  private loginRedirectButton = new ButtonComponent({});

  private selectLikeBillingCheckBox = new CheckboxComponent({});

  private selectLikeShippingCheckBox = new CheckboxComponent({});

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
    this.addLoginRedirectButton();
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
    this.selectLikeBillingCheckBox = new CheckboxComponent({
      content: 'Select like billing',
      onClick: () => {
        RegistrationView.toggleAddressSection(this.billingAddressSection);
      },
    });
    this.shippingAddressSection.appendChild(this.selectLikeBillingCheckBox);
    this.form.node.appendChild(this.shippingAddressSection.htmlElement);
  }

  private addBillingAddress() {
    this.billingAddressSection = new AddressSection('Billing Address');
    this.selectLikeShippingCheckBox = new CheckboxComponent({
      content: 'Select like shipping',
      onClick: () => {
        RegistrationView.toggleAddressSection(this.shippingAddressSection);
      },
    });
    this.billingAddressSection.appendChild(this.selectLikeShippingCheckBox);
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

  private addLoginRedirectButton() {
    const attrs: IButtonAttributes = {
      content: 'I already have an account',
      onClick: () => {
        Router.navigateTo('login');
      },
    };
    this.loginRedirectButton = new ButtonComponent(attrs);
    this.loginRedirectButton.addClass('col');
    this.loginRedirectButton.addClass('s4');
    this.loginRedirectButton.addClass('offset-s8');
    const row = new BaseComponent({ classList: 'row col s12' });
    row.appendChild(this.loginRedirectButton);
    this.form.appendChild(row);
  }

  private addSubmitButton() {
    const attrs: IButtonAttributes = {
      type: 'button',
      content: 'Sign Up',
      tag: 'button',
      onClick: () => {
        this.submitForm();
      },
    };
    this.submitButton = new ButtonComponent(attrs);
    this.submitButton.addClass('col');
    this.submitButton.addClass('s6');
    this.submitButton.addClass('offset-s3');
    const row = new BaseComponent({ classList: 'row col s12' });
    row.appendChild(this.submitButton);
    this.form.appendChild(row);
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
    return isValid;
  }

  submitForm() {
    if (!this.isValid()) {
      RegistrationView.showErrorMessage('Form invalid');
      return;
    }
    const addresses = [];
    let defaultShipping;
    let defaultBilling;

    if (this.shippingAddressSection.isEnable) {
      addresses.push(this.shippingAddressSection.address);
      if (this.shippingAddressSection.isDefault) {
        defaultShipping = addresses.length - 1;
        if (!this.billingAddressSection.isEnable) {
          defaultBilling = defaultShipping;
        }
      }
    }

    if (this.billingAddressSection.isEnable) {
      addresses.push(this.billingAddressSection.address);
      if (this.billingAddressSection.isDefault) {
        defaultBilling = addresses.length - 1;
        if (!this.shippingAddressSection.isEnable) {
          defaultShipping = defaultBilling;
        }
      }
    }

    const customerData: CustomerDraft = {
      email: this.emailInput.input.value,
      password: this.passwordInput.input.value,
      firstName: this.firstNameInput.input.value,
      lastName: this.secondNameInput.input.value,
      dateOfBirth: this.birthdayInput.input.value,
      addresses,
      defaultShippingAddress: defaultShipping,
      defaultBillingAddress: defaultBilling,
    };
    /* TODO: add login and redirect */
    registration(
      customerData,
      RegistrationView.showSucessMessage,
      RegistrationView.showErrorMessage
    );
  }

  static toggleAddressSection(addressSection: AddressSection) {
    addressSection.htmlElement.classList.toggle(styles.hidden);
    addressSection.setEnable(!addressSection.isEnable);
    addressSection.setDefault(false);
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

  public clearContent(): void {
    document.body.removeChild(this.htmlElement);
  }
}
