import { ClientResponse, Cart } from '@commercetools/platform-sdk';
import ApiRoot from './api-root';

export default function recalculateCart(
  cartId: string,
  cartVersion: number,
  successCallback: (cartData: Cart) => void,
  errorCallback: (message: string) => void
) {
  ApiRoot.root
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'recalculate',
            updateProductData: true,
          },
        ],
      },
    })
    .execute()
    .then((response: ClientResponse<Cart>) => {
      const cartData: Cart = response.body;
      successCallback(cartData);
    })
    .catch((error: ClientResponse<{ message: string }>) => {
      errorCallback(error.body.message);
    });
}
