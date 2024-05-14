import { IValidator } from '../../components/validator';

export const passwordValidator: IValidator = {
  validateFunction: (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])?.{8,}$/;
    return passwordRegex.test(value.trim());
  },
  invalidMessage: 'Password must be at least 8 characters long, include an uppercase and a lowercase letter, and a digit.',
};

export const specialCharValidator: IValidator = {
  validateFunction: (value: string) => {
    const specialCharRegex = /[!@#$%^&*]/;
    return specialCharRegex.test(value);
  },
  invalidMessage: 'Password must contain at least one special character (e.g., !@#$%^&*).',
};
