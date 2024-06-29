import { IFormInputField, createInputField } from './create-input-field';
import atLeastOneCharacter from './validators/at-least-one-character-validator';
import noSpecialCharacterOrNumber from './validators/no-special-characters-or-numbers-validator';

export default function createNameField(
  label: string,
  id: string,
  placeholder: string,
  disabled?: boolean
) {
  const defaultAttrs: IFormInputField = {
    label,
    id,
    type: 'text',
    placeholder,
    disabled,
    customValidators: [atLeastOneCharacter, noSpecialCharacterOrNumber],
  };
  return createInputField(defaultAttrs);
}
