import View from '@views/view';
import { IAttributes } from '@components/base-component';
import { FormComponent, IFormAttributes } from '@components/form-component';
import {
  IInputFieldAttributes,
  InputFieldComponent,
} from '@components/input-field-component';
import { ILabelAttriubutes } from '@components/label-component';
import { IInputAttributes } from '@components/input-component';
import {
  ButtonComponent,
  IButtonAttributes,
} from '@components/button-component';
import login from '@services/login-authorization';
import emailValidator from '@utils/validators/email-validator';
import {
  passwordValidator,
  specialCharValidator,
} from '@utils/validators/password-validator';
import Router from '@utils/router';
import { showErrorMessage, showSucessMessage } from '@utils/toast-messages';

export default class LoginView extends View {
  private form = new FormComponent({});

  private emailField = new InputFieldComponent({}, {}, {});

  private passwordField = new InputFieldComponent({}, {}, {});

  private button = new ButtonComponent({});

  private showPasswordButton = new ButtonComponent({});

  constructor() {
    const attrs: IAttributes = {
      tag: 'section',
      id: 'login-section',
      classList: ['col s12'],
    };
    super(attrs);
    this.addForm();
    this.addEmailField();
    this.addPasswordField();
    this.addLoginButton();
  }

  public addForm() {
    const attrs: IFormAttributes = {
      classList: 'col s6 offset-s3',
      noValidate: true,
      onInput: () => {
        // console.log('Что-то введено');
      },
      onSubmit: () => {
        // console.log('Форма отправлена');
      },
    };
    this.form = new FormComponent(attrs);
    this.appendChild(this.form);
  }

  public addEmailField() {
    const attrs: IInputFieldAttributes = {
      customValidators: [emailValidator],
      // classList: 'red-text'
    };
    const labelAttrs: ILabelAttriubutes = {
      content: 'Enter your email',
      for: 'email',
    };
    const inputAttrs: IInputAttributes = {
      placeholder: 'example@mail.com',
      id: 'email',
      type: 'email',
      required: true,
    };

    this.emailField = new InputFieldComponent(attrs, labelAttrs, inputAttrs);
    this.form.appendChild(this.emailField);
  }

  public addPasswordField() {
    const attrs: IInputFieldAttributes = {
      customValidators: [passwordValidator, specialCharValidator],
    };
    const labelAttrs: ILabelAttriubutes = {
      content: 'Enter your password',
      for: 'password',
    };
    const inputAttrs: IInputAttributes = {
      placeholder: 'Super secret password',
      id: 'password',
      type: 'password',
      required: true,
    };
    this.passwordField = new InputFieldComponent(attrs, labelAttrs, inputAttrs);
    this.form.appendChild(this.passwordField);

    const toggleButtonAttrs: IButtonAttributes = {
      content: 'Show/Hide Password',
      onClick: (event) => {
        if (event) {
          event.preventDefault();
        }
        this.passwordField.togglePasswordVisibility();
      },
    };

    this.showPasswordButton = new ButtonComponent(toggleButtonAttrs);
    this.passwordField.appendChild(this.showPasswordButton);
  }

  public addLoginButton() {
    const attrs: IButtonAttributes = {
      type: 'button',
      content: 'Sign in',
      onClick: () => {
        if (this.emailField.isValid() && this.passwordField.isValid()) {
          const email = this.emailField.getValue();
          const password = this.passwordField.getValue();
          login({ email, password }, LoginView.sucessLogin, showErrorMessage);
        }
      },
    };
    this.button = new ButtonComponent(attrs);
    this.button.addClass('col');
    this.button.addClass('s6');
    this.form.appendChild(this.button);
  }

  static sucessLogin() {
    const SUCSESS_MSG = 'You have successfully logged in';
    Router.navigateTo('#main');
    showSucessMessage(SUCSESS_MSG);
  }

  public clearContent(): void {
    document.body.removeChild(this.htmlElement);
  }
}
