import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import ApiRoot from './api-root';

const removeCart = (
  cartId: string,
  cartVersion: number,
  successCallback: (cartData: Cart) => void,
  errorCallback: (message: string) => void
): void => {
  ApiRoot.root
    .carts()
    .withId({ ID: cartId })
    .delete({
      queryArgs: { version: cartVersion },
    })
    .execute()
    .then((response: ClientResponse<Cart>) => {
      const cartData: Cart = response.body;
      successCallback(cartData);
    })
    .catch((error: ClientResponse<{ message: string }>) => {
      errorCallback(error.body.message);
    });
};

export default removeCart;
