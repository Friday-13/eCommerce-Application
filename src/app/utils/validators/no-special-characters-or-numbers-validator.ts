import { IValidator } from './validator';

const NO_SPECIAL_CHARACTER_MSG =
  'Must contain no special characters or numbers';

const noSpecialCharacterOrNumber: IValidator = {
  invalidMessage: NO_SPECIAL_CHARACTER_MSG,
  validateFunction: (value: string) => {
    const regexp = /^[a-zA-Z -]*[^-]$/;
    return regexp.test(value);
  },
};

export default noSpecialCharacterOrNumber;
