import { ClientResponse, Cart } from '@commercetools/platform-sdk';
import apiRoot from './api-root';

// Отправляет запрос на добавление товара в корзину
// При успешном добавлении товара вызывает successCallback с обновленными данными корзины
// eslint-disable-next-line import/prefer-default-export
export const addProductToCart = (
  cartId: string,
  cartVersion: number,
  productId: string,
  quantity: number,
  successCallback: (cartData: Cart) => void,
  errorCallback: (message: string) => void
): void => {
  apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'addLineItem',
            productId,
            quantity,
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
};
