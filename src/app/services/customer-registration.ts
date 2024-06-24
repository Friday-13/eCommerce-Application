import { CustomerDraft } from '@commercetools/platform-sdk';
import { customerTokenResponse } from '@models/customer';
import CookieManager from '@utils/cookie';
import ApiRoot from './api-root';
import login from './login-authorization';
import currentCart from './current-cart';

const EMAIL_EXIST_ADD_MSG = 'Use another email or try to login';
const EMAIL_EXIST_DEF_MSG =
  'There is already an existing customer with the provided email.';

const registration = (
  customer: CustomerDraft,
  sucessCallback: (message: string) => void,
  errorCallback: (message: string) => void
) => {
  ApiRoot.root
    .customers()
    .post({
      body: customer,
    })
    .execute()
    .then((response) => {
      const customerDataForId = customerTokenResponse(response.body.customer);
      if (customerDataForId && customerDataForId.id) {
        CookieManager.setUserId(customerDataForId.id);
        currentCart.createCustomerCart(customerDataForId.id);
      }
      login(
        { email: customer.email, password: customer.password as string },
        sucessCallback,
        errorCallback
      );
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
