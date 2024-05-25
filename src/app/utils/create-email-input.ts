import { IFormInputField, createInputField } from '@utils/create-input-field';
import emailValidator from '@utils/validators/email-validator';

export default function createEmailInput(attrs?: IFormInputField) {
  let defaultAttrs;
  if (!attrs) {
    defaultAttrs = {
      label: 'E-mail',
      id: 'email',
      placeholder: 'example@mail.com',
      type: 'text',
      customValidators: [emailValidator],
      required: true,
    };
  } else {
    defaultAttrs = attrs;
  }
  return createInputField(defaultAttrs);
}
