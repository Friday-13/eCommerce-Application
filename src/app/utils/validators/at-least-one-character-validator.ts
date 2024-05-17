import { IValidator } from './validator';

const AT_LEAST_ONE_CHARACTER_MSG = 'Must contain at least one character';
const atLeastOneCharacter: IValidator = {
  invalidMessage: AT_LEAST_ONE_CHARACTER_MSG,
  validateFunction: (value: string) => {
    return value.length > 0;
  },
};

export default atLeastOneCharacter;
