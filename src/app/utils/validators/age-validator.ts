import { IValidator } from './validator';

const MIN_AGE = 13;
const TOO_YOUNG_MSG = `You should be ${MIN_AGE} y.o. or older`;

const birthdayLimitation: IValidator = {
  invalidMessage: TOO_YOUNG_MSG,
  validateFunction: (value: string) => {
    const birthday = new Date(value);
    const diffMs = Date.now() - birthday.valueOf();
    const ageNow = new Date(diffMs).getUTCFullYear() - 1970;
    return ageNow >= MIN_AGE;
  },
};

export default birthdayLimitation;
