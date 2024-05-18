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
import style from './login-page.module.scss';
import emailValidator from '../../utils/email-validator';
import {
  passwordValidator,
  specialCharValidator,
} from '../../utils/password-validator';

export default class LoginView extends View {
  private form = new FormComponent({});

  private loginField = new InputFieldComponent({}, {}, {});

  private emailField = new InputFieldComponent({}, {}, {});

  private passwordField = new InputFieldComponent({}, {}, {});

  private button = new ButtonComponent({});

  private showPasswordButton = new ButtonComponent({});

  constructor() {
    const attrs: IAttributes = {
      tag: 'section',
      id: 'login-section',
      classList: ['col s12', style.mySuperClass],
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
      // classList: ['red-text']
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
      content: 'Login',
      onClick: () => {
        // console.log('Trying login');
      },
    };
    this.button = new ButtonComponent(attrs);
    this.button.addClass('col');
    this.button.addClass('s6');

    this.form.appendChild(this.button);
  }
}