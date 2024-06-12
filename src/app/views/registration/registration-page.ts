import { CustomerDraft } from '@commercetools/platform-sdk';
import { BaseComponent, IAttributes } from '@components/base-component';
import {
  ButtonComponent,
  IButtonAttributes,
} from '@components/button-component';
import { CheckboxComponent } from '@components/checkbox-component';
import { FormComponent, IFormAttributes } from '@components/form-component';
import { InputFieldComponent } from '@components/input-field-component';
import registration from '@services/customer-registration';
import createDateField from '@utils/create-date-field';
import createEmailField from '@utils/create-email-field';
import createNameField from '@utils/create-name-field';
import createPasswordField from '@utils/create-password-field';
import Router from '@utils/router';
import { showErrorMessage, showSucessMessage } from '@utils/toast-messages';
import View from '@views/view';
import AddressSection from './address';
import FormSectionView from './form-section';
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
      classList: 'col s6 offset-s3',
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
    this.emailInput = createEmailField();
    this.passwordInput = createPasswordField();
    this.credentialsSection.appendChild(this.emailInput);
    this.credentialsSection.appendChild(this.passwordInput);
    this.form.node.appendChild(this.credentialsSection.htmlElement);
  }

  private addPersonalInformation() {
    this.pesonalSection = new FormSectionView('Personal Information');
    this.firstNameInput = createNameField('First name', 'first-name', 'John');
    this.secondNameInput = createNameField('Second name', 'second-name', 'Doe');
    this.birthdayInput = createDateField('Birthday', 'Birthday', 'birthday');
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
      showErrorMessage('Form invalid');
      return;
    }
    registration(
      this.collectFormData(),
      RegistrationView.sucessRegister,
      showErrorMessage
    );
  }

  private collectFormData() {
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

    return customerData;
  }

  static toggleAddressSection(addressSection: AddressSection) {
    addressSection.htmlElement.classList.toggle(styles.hidden);
    addressSection.setEnable(!addressSection.isEnable);
    addressSection.setDefault(false);
  }

  static sucessRegister() {
    const SUCSESS_MSG = 'You have successfully registered';
    Router.navigateTo('#main');
    showSucessMessage(SUCSESS_MSG);
  }
}
