import { Address, Customer } from '@commercetools/platform-sdk';
import { BaseComponent, IAttributes } from '@components/base-component';
import { FormComponent, IFormAttributes } from '@components/form-component';
import { InputFieldComponent } from '@components/input-field-component';
import FormSectionView from '@views/registration/form-section';
import createNameField from '@utils/create-name-field';
import createDateField from '@utils/create-date-field';
import { showErrorMessage } from '@utils/toast-messages';
import View from '@views/view';
import { getCustomer } from '@services/get-customer';
import {
  postalCodeNoCountryValidator,
  postalCodeUKValidator,
  postalCodeUSSRValidator,
} from '@utils/validators/post-code-validator';
import { IFormInputField, createInputField } from '@utils/create-input-field';
import atLeastOneCharacter from '@utils/validators/at-least-one-character-validator';
import noSpecialCharacterOrNumber from '@utils/validators/no-special-characters-or-numbers-validator';
import { CheckboxComponent } from '@components/checkbox-component';
import {
  ButtonComponent,
  IButtonAttributes,
} from '@components/button-component';
import createEmailField from '@utils/create-email-field';
import Router from '@utils/router';
import updateCutomerPersonalInfo from './change-personal-info';

export default class ProfileView extends View {
  private form = new FormComponent({});

  private firstNameInput = new InputFieldComponent({}, {}, {});

  private lastNameInput = new InputFieldComponent({}, {}, {});

  private birthdayInput = new InputFieldComponent({}, {}, {});

  private pesonalSection = new FormSectionView();

  public streetInput = new InputFieldComponent({}, {}, {});

  public cityInput = new InputFieldComponent({}, {}, {});

  public postalCodeInput = new InputFieldComponent({}, {}, {});

  public countryInput = new BaseComponent({});

  private addressContainer = new FormSectionView();

  private shippingAddressContainer = new FormSectionView();

  private billingAddressContainer = new FormSectionView();

  private billingAndShipping = new FormSectionView();

  private passwordSection = new FormSectionView();

  private currentPasswordInput = new InputFieldComponent({}, {}, {});

  private newPasswordInput = new InputFieldComponent({}, {}, {});

  private confirmPasswordInput = new InputFieldComponent({}, {}, {});

  private emailInput = new InputFieldComponent({}, {}, {});

  constructor() {
    const attrs: IAttributes = {
      classList: 'row',
    };

    super(attrs);
    this.addForm();
    this.populateProfileView();
    this.addPersonalInformation();
    this.addPasswordFields();
    this.createChangePasswordButton();
    this.addEditButton();
    this.addSaveButton();
  }

  private addForm() {
    const attrs: IFormAttributes = {
      classList: 'col s6 offset-s3',
    };
    this.form = new FormComponent(attrs);
    this.appendChild(this.form);
  }

  private async populateProfileView() {
    try {
      const customerData = await getCustomer();
      this.populateForm(customerData);
      this.populateAddresses(customerData);
    } catch (error) {
      showErrorMessage('Error getting customer data');
    }
  }

  private populateForm(customerData: Customer | null) {
    if (customerData) {
      const customer: Customer = customerData;
      if (customer.firstName !== undefined) {
        this.firstNameInput.input.value = customer.firstName;
      } else {
        showErrorMessage('First name is undefined');
      }
      if (customer.lastName !== undefined) {
        this.lastNameInput.input.value = customer.lastName;
      } else {
        showErrorMessage('Last name is undefined');
      }
      if (customer.dateOfBirth !== undefined) {
        this.birthdayInput.input.value = customer.dateOfBirth;
      } else {
        showErrorMessage('Date of birth is undefined');
      }
      if (customer.email !== undefined) {
        this.emailInput.input.value = customer.email;
      } else {
        showErrorMessage('Email is undefined');
      }
    } else {
      showErrorMessage('Error getting customer data');
    }
  }

  private addPersonalInformation() {
    this.pesonalSection = new FormSectionView('Personal Information');
    this.firstNameInput = createNameField(
      'First name',
      'first-name',
      this.firstNameInput.input.value
    );
    this.lastNameInput = createNameField(
      'Last name',
      'last-name',
      this.lastNameInput.input.value
    );
    this.birthdayInput = createDateField(
      'Birthday',
      'Birthday',
      this.birthdayInput.input.value
    );
    this.emailInput = createEmailField();
    this.firstNameInput.input.setDisable(true);
    this.lastNameInput.input.setDisable(true);
    this.birthdayInput.input.setDisable(true);
    this.emailInput.input.setDisable(true);
    this.pesonalSection.appendChild(this.firstNameInput);
    this.pesonalSection.appendChild(this.lastNameInput);
    this.pesonalSection.appendChild(this.birthdayInput);
    this.pesonalSection.appendChild(this.emailInput);
    this.form.node.appendChild(this.pesonalSection.htmlElement);
  }

  private createChangePasswordButton() {
    const buttonAttrs: IButtonAttributes = {
      type: 'button',
      classList: [
        'edit-profile-button',
        'profile-button',
        'waves-effect',
        'waves-light',
        'btn',
        'no-text-transform',
      ],
      content: 'Change Password',
      tag: 'button',
      onClick: () => {
        Router.navigateTo('#change');
      },
    };

    const button = new ButtonComponent(buttonAttrs);
    this.form.appendChild(button);
  }

  private addPasswordFields() {
    this.passwordSection = new FormSectionView('Password Management');
    this.form.node.appendChild(this.passwordSection.htmlElement);
  }

  private populateAddresses(customerData: Customer | null): void {
    this.addressContainer = new FormSectionView('Addresses');
    this.shippingAddressContainer = new FormSectionView('Shipping Address');
    this.billingAddressContainer = new FormSectionView('Billing Address');
    this.billingAndShipping = new FormSectionView('Billing & Shipping Address');
    if (customerData && customerData.addresses) {
      const { addresses } = customerData;
      const defaultShippingId = customerData.defaultShippingAddressId;
      const defaultBillingId = customerData.defaultBillingAddressId;

      if (addresses.length === 1) {
        this.addAddressInputs(
          customerData,
          addresses[0],
          this.billingAndShipping,
          'Both'
        );
        this.addressContainer.appendChild(this.billingAndShipping);
      } else {
        const shippingAddress =
          addresses.find((address) => address.id === defaultShippingId) ||
          addresses[0];
        const billingAddress =
          addresses.find((address) => address.id === defaultBillingId) ||
          addresses[1] ||
          addresses[0];

        this.addAddressInputs(
          customerData,
          shippingAddress,
          this.shippingAddressContainer,
          'Shipping'
        );
        this.addAddressInputs(
          customerData,
          billingAddress,
          this.billingAddressContainer,
          'Billing'
        );
        this.addressContainer.appendChild(this.shippingAddressContainer);
        this.addressContainer.appendChild(this.billingAddressContainer);
      }
    } else {
      showErrorMessage('Error getting customer data or addresses');
    }
    this.form.node.appendChild(this.addressContainer.htmlElement);
  }

  private addAddressInputs(
    customerData: Customer | null,
    address: Address,
    container: FormSectionView,
    type: string
  ): void {
    this.addStreetInput(address, container);
    this.addCityInput(address, container);
    this.addCountryInput(address, container);
    this.addPostalCodeInput(address, container);
    if (customerData) {
      if (
        address.id === customerData.defaultShippingAddressId &&
        (type === 'Shipping' || type === 'Both')
      ) {
        const checkbox = new CheckboxComponent({
          classList: 'filled-in',
          content: 'Default Shipping Address',
          disabled: true,
        });
        checkbox.checked = true;
        container.appendChild(checkbox);
      }
      if (
        address.id === customerData.defaultBillingAddressId &&
        (type === 'Billing' || type === 'Both')
      ) {
        const checkbox = new CheckboxComponent({
          classList: 'filled-in',
          content: 'Default Billing Address',
          disabled: true,
        });
        checkbox.checked = true;
        container.appendChild(checkbox);
      }
    }
  }

  private addStreetInput(address: Address, container: FormSectionView) {
    const attrs: IFormInputField = {
      id: 'street',
      type: 'text',
      label: 'Street',
      placeholder: `${address.streetName}`,
      customValidators: [atLeastOneCharacter],
      disabled: true,
    };
    this.streetInput = createInputField(attrs);
    container.appendChild(this.streetInput);
  }

  private addCityInput(address: Address, container: FormSectionView) {
    const attrs: IFormInputField = {
      id: 'city',
      type: 'text',
      label: 'City',
      placeholder: `${address.city}`,
      customValidators: [atLeastOneCharacter, noSpecialCharacterOrNumber],
      disabled: true,
    };
    this.cityInput = createInputField(attrs);
    container.appendChild(this.cityInput);
  }

  private addPostalCodeInput(address: Address, container: FormSectionView) {
    const attrs: IFormInputField = {
      id: 'postal-code',
      type: 'text',
      label: 'Postal code',
      placeholder: `${address.postalCode}`,
      customValidators: [
        postalCodeUKValidator,
        postalCodeUSSRValidator,
        postalCodeNoCountryValidator,
      ],
      disabled: true,
    };
    this.postalCodeInput = createInputField(attrs);
    container.appendChild(this.postalCodeInput);
  }

  private addCountryInput(address: Address, container: FormSectionView) {
    const attrs: IFormInputField = {
      id: 'country',
      type: 'text',
      label: 'Country',
      placeholder: `${address.country}`,
      disabled: true,
      customValidators: [],
    };
    this.countryInput = createInputField(attrs);
    container.appendChild(this.countryInput);
  }

  public enableEditPassword() {
    this.currentPasswordInput.input.setDisable(false);
    this.newPasswordInput.input.setDisable(false);
    this.confirmPasswordInput.input.setDisable(false);
  }

  public enableEditPersonal() {
    this.firstNameInput.input.setDisable(false);
    this.lastNameInput.input.setDisable(false);
    this.birthdayInput.input.setDisable(false);
    this.emailInput.input.setDisable(false);
  }

  public enableEditAddress() {
    this.streetInput.input.setDisable(false);
    this.cityInput.input.setDisable(false);
    this.postalCodeInput.input.setDisable(false);
  }

  public enableSavePassword() {
    this.currentPasswordInput.input.setDisable(true);
    this.newPasswordInput.input.setDisable(true);
    this.confirmPasswordInput.input.setDisable(true);
  }

  public enableSavePersonal() {
    this.firstNameInput.input.setDisable(true);
    this.lastNameInput.input.setDisable(true);
    this.birthdayInput.input.setDisable(true);
    this.emailInput.input.setDisable(true);
  }

  public enableSaveAddress() {
    this.streetInput.input.setDisable(true);
    this.cityInput.input.setDisable(true);
    this.postalCodeInput.input.setDisable(true);
  }

  private addEditButton() {
    const buttonEditAttr: IButtonAttributes = {
      classList: [
        'edit-profile-button',
        'profile-button',
        'waves-effect',
        'waves-light',
        'btn',
        'no-text-transform',
      ],
      content: 'Edit',
    };
    const buttonEditPersonal = new BaseComponent(buttonEditAttr);
    const buttonEditAddress = new BaseComponent(buttonEditAttr);
    buttonEditPersonal.node.addEventListener('click', (event) => {
      event.preventDefault();
      this.enableEditPersonal();
    });
    buttonEditAddress.node.addEventListener('click', (event) => {
      event.preventDefault();
      this.enableEditAddress();
    });
    this.pesonalSection.appendChild(buttonEditPersonal);
    this.addressContainer.appendChild(buttonEditAddress);
  }

  private addSaveButton() {
    const buttonSaveAttr: IButtonAttributes = {
      classList: [
        'save-profile-button',
        'profile-button',
        'waves-effect',
        'waves-light',
        'btn',
        'no-text-transform',
      ],
      content: 'Save',
    };
    const buttonSavePersonal = new BaseComponent(buttonSaveAttr);
    const buttonSaveAddress = new BaseComponent(buttonSaveAttr);
    buttonSavePersonal.node.addEventListener('click', (event) => {
      event.preventDefault();
      const firstName = this.firstNameInput.input.value;
      const lastName = this.lastNameInput.input.value;
      const dateOfBirth = this.birthdayInput.input.value;
      const email = this.emailInput.input.value;
      updateCutomerPersonalInfo(firstName, lastName, dateOfBirth, email);
      this.enableSavePersonal();
    });
    buttonSaveAddress.node.addEventListener('click', (event) => {
      event.preventDefault();
      this.enableSaveAddress();
    });

    this.pesonalSection.appendChild(buttonSavePersonal);
    this.addressContainer.appendChild(buttonSaveAddress);
  }
}
