import { IValidator } from '../../components/validator';

const emailValidator: IValidator = {
  validateFunction: (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  },
  invalidMessage: '',
};

export default emailValidator;
