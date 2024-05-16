import { IValidator } from './validator';

const AT_LEAST_ONE_CHARACTER_MSG = 'Must contain at least one character';
const NO_SPECIAL_CHARACTER_MSG =
  'Must contain no special characters or numbers';

export const atLeastOneCharacter: IValidator = {
  invalidMessage: AT_LEAST_ONE_CHARACTER_MSG,
  validateFunction: (value: string) => {
    return value.length > 0;
  },
};

export const noSpecialCharacter: IValidator = {
  invalidMessage: NO_SPECIAL_CHARACTER_MSG,
  validateFunction: (value: string) => {
    const regexp = /^[a-zA-Z ]*$/;
    return regexp.test(value);
  },
};
