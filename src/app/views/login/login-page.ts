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
      onClick: async () => {
        const email = this.emailField.getValue();
        const password = this.passwordField.getValue();

        try {
          const response = await login(email, password);
          if (response && response.customer) {
            // console.log('Login successful');
          }
        } catch (error) {
          // console.error('Login failed:(', error);
        }
      },
    };
    this.button = new ButtonComponent(attrs);
    this.button.addClass('col');
    this.button.addClass('s6');
    this.form.appendChild(this.button);

    this.button.node.addEventListener('click', (event) => {
      event.preventDefault();
      Router.navigateTo('#main');
    });
  }

  public clearContent(): void {
    document.body.removeChild(this.htmlElement);
  }
}
