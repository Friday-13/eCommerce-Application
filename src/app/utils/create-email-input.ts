import { IFormInputField, createInputField } from '@utils/create-input-field';
import emailValidator from '@utils/validators/email-validator';

export default function createEmailInput(attrs?: IFormInputField) {
  let fieldAttrs;
  if (!attrs) {
    fieldAttrs = {
      label: 'E-mail',
      id: 'email',
      placeholder: 'example@mail.com',
      type: 'text',
      customValidators: [emailValidator],
      required: true,
    };
  } else {
    fieldAttrs = attrs;
  }
  return createInputField(fieldAttrs);
}
