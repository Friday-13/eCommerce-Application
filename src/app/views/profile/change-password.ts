import View from '@views/view';
import { BaseComponent, IAttributes } from '@components/base-component';
import { FormComponent, IFormAttributes } from '@components/form-component';
import { InputFieldComponent } from '@components/input-field-component';
import {
  ButtonComponent,
  IButtonAttributes,
} from '@components/button-component';
import Router from '@utils/router';
import { showErrorMessage, showSucessMessage } from '@utils/toast-messages';
import createPasswordField from '@utils/create-password-field';
import createEmailField from '@utils/create-email-field';
import { getCustomer } from '@services/get-customer';
import { Customer, CustomerSignin } from '@commercetools/platform-sdk';
import FormSectionView from '@views/registration/form-section';
import { IFormInputField } from '@utils/create-input-field';
import {
  passwordValidator,
  specialCharValidator,
} from '@utils/validators/password-validator';
import ApiRoot from '@services/api-root';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import logoutCustomer from '@services/logout-customer';
import loginWithoutMerge from '@services/login-without-merge';
import changeCustomerPassword from './password';

export default class PasswordChangeView extends View {
  private form = new FormComponent({});

  private currentWrapper = new BaseComponent({});

  private newWrapper = new BaseComponent({});

  private passwordSection = new FormSectionView();

  private emailField = new InputFieldComponent({}, {}, {});

  private passwordField = new InputFieldComponent({}, {}, {});

  private newPasswordField = new InputFieldComponent({}, {}, {});

  private confirmNewPasswordField = new InputFieldComponent({}, {}, {});

  private button = new ButtonComponent({});

  private showPasswordButton = new ButtonComponent({});

  private changePassword = new ButtonComponent({});

  constructor() {
    const attrs: IAttributes = {
      tag: 'section',
      id: 'change-section',
      classList: 'row',
    };
    super(attrs);
    this.addForm();
    this.addCurrentSection();
    this.getData();
    this.addEmailField();
    this.addPasswordField();
    this.addNewPasswordField();
  }

  private addForm() {
    const attrs: IFormAttributes = {
      classList: 'col s6 offset-s3',
    };
    this.form = new FormComponent(attrs);
    this.passwordSection = new FormSectionView(
      'You can change your password here:'
    );
    this.appendChild(this.form);
    this.form.node.appendChild(this.passwordSection.htmlElement);
  }

  private async getData() {
    try {
      // const customer = JSON.parse(
      //   localStorage.getItem('codecraftCustomer') as string
      // );
      const customerData = await getCustomer();
      this.populateForm(customerData);
      this.addConfirmPasswordButton();
      this.addChangePasswordButton(customerData);
      return customerData;
    } catch (error) {
      showErrorMessage('Error getting customer data');
      return null;
    }
  }

  private populateForm(customerData: Customer | null) {
    if (customerData) {
      const customer: Customer = customerData;
      if (customer.email !== undefined) {
        this.emailField.input.value = customer.email;
      } else {
        showErrorMessage('Email is undefined');
      }
    } else {
      showErrorMessage('Error getting customer data');
    }
  }

  private addCurrentSection() {
    const currentWrapperAttr: IAttributes = {
      tag: 'section',
      classList: 'row col s12',
    };
    this.currentWrapper = new BaseComponent(currentWrapperAttr);
    this.form.appendChild(this.currentWrapper);
  }

  public addEmailField() {
    this.emailField = createEmailField();
    this.emailField.input.setDisable(true);
    this.currentWrapper.appendChild(this.emailField);
  }

  public addPasswordField() {
    const updatedAttrs: IFormInputField = {
      id: 'currentPassword',
      label: 'Current password',
      placeholder: 'Enter current password',
      type: 'password',
      customValidators: [],
    };
    this.passwordField = createPasswordField(updatedAttrs);
    this.currentWrapper.appendChild(this.passwordField);
  }

  public addConfirmPasswordButton() {
    const attrs: IButtonAttributes = {
      type: 'button',
      content: 'Confirm current password',
      onClick: () => {
        const email = this.emailField.getValue();
        const password = this.passwordField.getValue();
        this.authenticateCustomer(email, password);
      },
    };
    this.button = new ButtonComponent(attrs);
    this.button.addClass('col');
    this.button.addClass('s6');
    this.currentWrapper.appendChild(this.button);

    const toggleButtonAttrs: IButtonAttributes = {
      content: 'Show/Hide Password',
      onClick: (event) => {
        if (event) {
          event.preventDefault();
        }
        this.passwordField.togglePasswordVisibility();
        this.newPasswordField.togglePasswordVisibility();
        this.confirmNewPasswordField.togglePasswordVisibility();
      },
    };

    this.showPasswordButton = new ButtonComponent(toggleButtonAttrs);
    this.showPasswordButton.addClass('show-hide');
    this.form.appendChild(this.showPasswordButton);
  }

  async authenticateCustomer(email: string, password: string) {
    const signInBody: CustomerSignin = {
      email,
      password,
    };
    const user: UserAuthOptions = {
      password,
      username: email,
    };
    try {
      const signInResult = await ApiRoot.getPasswordRoot(user)
        .login()
        .post({ body: signInBody })
        .execute();
      const customerData = signInResult.body.customer;
      showSucessMessage('Valid password');
      this.addNewSection();
      this.addNewPasswordField();
      this.addChangePasswordButton(customerData);
      return signInResult;
    } catch (error) {
      showErrorMessage('Invalid password');
      throw error;
    }
  }

  private addNewSection() {
    const newWrapperAttr: IAttributes = {
      tag: 'section',
      classList: 'row col s12',
    };
    this.newWrapper = new BaseComponent(newWrapperAttr);
    this.form.appendChild(this.newWrapper);
  }

  public addNewPasswordField() {
    const newPasswordAttrs: IFormInputField = {
      id: 'new-password',
      label: 'Enter new password',
      placeholder: 'New password',
      type: 'password',
      customValidators: [passwordValidator, specialCharValidator],
    };
    this.newPasswordField = createPasswordField(newPasswordAttrs);
    this.newWrapper.appendChild(this.newPasswordField);

    const confirmNewPasswordAttrs: IFormInputField = {
      id: 'confirm-new',
      label: 'Enter new password again',
      placeholder: 'New password',
      type: 'password',
      customValidators: [passwordValidator, specialCharValidator],
    };
    this.confirmNewPasswordField = createPasswordField(confirmNewPasswordAttrs);
    this.newWrapper.appendChild(this.confirmNewPasswordField);
  }

  public addChangePasswordButton(customerData: Customer | null) {
    const attrs: IButtonAttributes = {
      type: 'button',
      content: 'Save new password',
      onClick: () => this.handlePasswordChange(customerData),
    };

    this.changePassword = new ButtonComponent(attrs);
    this.changePassword.addClass('col');
    this.changePassword.addClass('s6');
    this.newWrapper.appendChild(this.changePassword);
  }

  private handlePasswordChange(customerData: Customer | null) {
    const currentPassword = this.passwordField.getValue().trim();
    const newPassword = this.newPasswordField.getValue().trim();
    const confirmedPassword = this.confirmNewPasswordField.getValue().trim();
    if (customerData && newPassword === confirmedPassword) {
      changeCustomerPassword(
        customerData.id,
        customerData.version,
        currentPassword,
        newPassword
      )
        .then(() => {
          PasswordChangeView.successChange();
          loginWithoutMerge(
            { email: customerData.email, password: newPassword },
            () => {
              Router.navigateTo('#profile');
            },
            () => {}
          );
        })
        .catch(() => showErrorMessage('Passwords do not match'));
    }
  }

  static successChange() {
    const SUCSESS_MSG = 'The password has been changed';
    logoutCustomer();
    showSucessMessage(SUCSESS_MSG);
  }
}
