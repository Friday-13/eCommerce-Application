import { customerTokenResponse, saveCustomerToken } from '@models/customer';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import ApiRoot from './api-root';

function login(
  customer: { email: string; password: string },
  sucessCallback: (message: string) => void,
  errorCallback: (message: string) => void
) {
  const user: UserAuthOptions = {
    password: customer.password,
    username: customer.email,
  };
  const root = ApiRoot.getPasswordRoot(user);
  root
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
