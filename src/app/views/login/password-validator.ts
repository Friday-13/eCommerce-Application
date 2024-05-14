import { IValidator } from '../../components/validator';

export const passwordValidator: IValidator = {
  validateFunction: (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])?.{8,}$/;
    return passwordRegex.test(value.trim());
  },
  invalidMessage: '',
};

export const specialCharValidator: IValidator = {
  validateFunction: (value: string) => {
    const specialCharRegex = /[!@#$%^&*]/;
    return specialCharRegex.test(value);
  },
  invalidMessage: '',
};
