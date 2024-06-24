import {
  ClientResponse,
  Cart,
  DiscountCodeReference,
} from '@commercetools/platform-sdk';
import ApiRoot from './api-root';

export default function removePromocodeFromCart(
  cartId: string,
  cartVersion: number,
  successCallback: (cartData: Cart) => void,
  errorCallback: (message: string) => void,
  code?: DiscountCodeReference
) {
  let discountCode: DiscountCodeReference;
  if (!code) {
    discountCode = { id: '', typeId: 'discount-code' };
  } else {
    discountCode = code;
  }
  ApiRoot.root
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'removeDiscountCode',
            discountCode,
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
