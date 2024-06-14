import { customerTokenResponse, saveCustomerToken } from '@models/customer';
import apiRoot from './api-root';
import { createCustomerRoot } from './customer-root';
import { createTokenRoot } from './token-root';

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
      const customerRoot = createCustomerRoot({
        username: customer.email,
        password: customer.password,
      });
      customerRoot
        .me()
        .get({})
        .execute()
        .then((responsePass) => {
          console.log(responsePass);
          const tokenRoot = createTokenRoot();
          tokenRoot
            .me()
            .post({
              body: {
                actions: [
                  {
                    lastName: 'tokenov',
                    action: 'setLastName',
                  },
                ],
                version: 1,
              },
            })
            .execute()
            .then((responseToken) => {
              console.log('Token auth');
              console.log(responseToken);
            });
        });
    })
    .catch((reason) => {
      errorCallback(reason.message);
    });
}

export default login;
