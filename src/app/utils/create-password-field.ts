import { IFormInputField, createInputField } from './create-input-field';
import {
  passwordValidator,
  specialCharValidator,
} from './validators/password-validator';

export default function createPasswordField(attrs?: IFormInputField) {
  let defaultAttrs;
  if (attrs) {
    defaultAttrs = attrs;
  } else {
    defaultAttrs = {
      label: 'Password',
      id: 'pass',
      placeholder: 'Super secret password',
      type: 'password',
      customValidators: [passwordValidator, specialCharValidator],
    };
  }
  return createInputField(defaultAttrs);
}
