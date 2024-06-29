import { IValidator } from './validator';

const CHOOSE_COUNTRY_MSG = 'Choose country at first';
const WRONG_POSTAL_CODE_MSG = 'Wrong postal code';

export const postalCodeNoCountryValidator: IValidator = {
  invalidMessage: CHOOSE_COUNTRY_MSG,
  validateFunction: () => {
    return false;
  },
};

export const postalCodeUKValidator: IValidator = {
  invalidMessage: WRONG_POSTAL_CODE_MSG,
  validateFunction: (value: string) => {
    const regexp = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/;
    return regexp.test(value);
  },
};

export const postalCodeUSSRValidator: IValidator = {
  invalidMessage: WRONG_POSTAL_CODE_MSG,
  validateFunction: (value: string) => {
    const regexp = /^\d{6}$/;
    return regexp.test(value);
  },
};
