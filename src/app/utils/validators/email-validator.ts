import { IValidator } from './validator';

const emailValidator: IValidator = {
  validateFunction: (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value.trim());
  },
  invalidMessage: 'Please enter a valid email address.',
};

export default emailValidator;
