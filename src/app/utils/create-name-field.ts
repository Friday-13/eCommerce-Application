import { IFormInputField, createInputField } from './create-input-field';
import atLeastOneCharacter from './validators/at-least-one-character-validator';
import noSpecialCharacterOrNumber from './validators/no-special-characters-or-numbers-validator';

export default function createNameField(
  label: string,
  id: string,
  placeholder: string
) {
  const defaultAttrs: IFormInputField = {
    label,
    id,
    type: 'text',
    placeholder,
    customValidators: [atLeastOneCharacter, noSpecialCharacterOrNumber],
  };
  return createInputField(defaultAttrs);
}
