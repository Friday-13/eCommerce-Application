import { customerTokenResponse } from '@models/customer';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import CookieManager from '@utils/cookie';
import ApiRoot from './api-root';
import currentCart from './current-cart';

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
      const customerDataForId = customerTokenResponse(response.body.customer);
      if (customerDataForId && customerDataForId.id) {
        CookieManager.setUserId(customerDataForId.id);
        const userId = CookieManager.getUserId();
        currentCart.initCurrentCart(userId);
      }
      sucessCallback('You have successfully logged in!');
    })
    .catch((reason) => {
      errorCallback(reason.message);
    });
}

export default login;
