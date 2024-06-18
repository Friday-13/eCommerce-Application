import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import LocalStorageManager from '@utils/local-cart-id';
import ApiRoot from './api-root';

// запрос на создание анон cart
// При успешном создании корзины вызывает successCallback с данными корзины.
export const createAnonymousCart = (
  successCallback: (cartData: Cart) => void,
  errorCallback: (message: string) => void
): void => {
  ApiRoot.root
    .carts()
    .post({
      body: {
        currency: 'USD',
      },
    })
    .execute()
    .then((response: ClientResponse<Cart>) => {
      const cartData: Cart = response.body;
      successCallback(cartData);
      if (cartData.id) {
        LocalStorageManager.setCartId(cartData.id);
      } else {
        errorCallback('Failed to retrieve cart ID');
      }
    })
    .catch((error: ClientResponse<{ message: string }>) => {
      errorCallback(error.body.message);
    });
};

export const createCustomerCart = (
  customerId: string,
  successCallback: (cartData: Cart) => void,
  errorCallback: (message: string) => void
): void => {
  ApiRoot.root
    .carts()
    .post({
      body: {
        currency: 'USD',
        customerId,
      },
    })
    .execute()
    .then((response: ClientResponse<Cart>) => {
      const cartData: Cart = response.body;
      successCallback(cartData);
      if (cartData.id) {
        LocalStorageManager.setCartId(cartData.id);
        console.log('Cart ID saved to localStorage:', cartData.id);
      } else {
        errorCallback('Failed to retrieve cart ID');
      }
    })
    .catch((error: ClientResponse<{ message: string }>) => {
      errorCallback(error.body.message);
    });
};

export const removeProductFromCart = (
  cartId: string,
  cartVersion: number,
  lineItemId: string,
  successCallback: (cartData: Cart) => void,
  errorCallback: (message: string) => void
): void => {
  ApiRoot.root
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
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
