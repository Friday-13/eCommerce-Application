import { CustomerDraft } from '@commercetools/platform-sdk';
import apiRoot from './api-root';

const SUCSESS_MSG = 'You have successfully registered';
const EMAIL_EXIST_ADD_MSG = 'Use another email or try to login';
const EMAIL_EXIST_DEF_MSG =
  'There is already an existing customer with the provided email.';

const registration = (
  customer: CustomerDraft,
  sucessCallback: (message: string) => void,
  errorCallback: (message: string) => void
) => {
  apiRoot
    .customers()
    .post({
      body: customer,
    })
    .execute()
    .then(() => {
      sucessCallback(SUCSESS_MSG);
    })
    .catch((reason) => {
      if (reason.message === EMAIL_EXIST_DEF_MSG) {
        errorCallback(`${reason.message}; ${EMAIL_EXIST_ADD_MSG}`);
      } else {
        errorCallback(reason.message);
      }
    });
};

export default registration;
