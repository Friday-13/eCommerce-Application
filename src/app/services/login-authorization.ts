import { customerTokenResponse, saveCustomerToken } from '@models/customer';
import apiRoot from './api-root';

function login(
  customer: { email: string; password: string },
  sucessCallback: (message: string) => void,
  errorCallback: (message: string) => void
) {
  apiRoot
    .login()
    .post({ body: customer })
    .execute()
    .then((response) => {
      const customerToken = customerTokenResponse(response.body.customer);
      if (customerToken) {
        saveCustomerToken(customerToken);
      }
      sucessCallback('You have successfully logged in!');
    })
    .catch((reason) => {
      errorCallback(reason.message);
    });
}

export default login;
