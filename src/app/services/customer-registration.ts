import { CustomerDraft } from '@commercetools/platform-sdk';
import apiRoot from './api-root';

const SUCSESS_MSG = 'Ready to login!';

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
      errorCallback(reason.message);
    });
};

export default registration;
