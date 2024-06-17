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
      if (cartData.id) {
        LocalStorageManager.setCartId(cartData.id);
        successCallback(cartData);
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
      if (cartData.id) {
        LocalStorageManager.setCartId(cartData.id);
        console.log('Cart ID saved to localStorage:', cartData.id);
        successCallback(cartData);
      } else {
        errorCallback('Failed to retrieve cart ID');
      }
    })
    .catch((error: ClientResponse<{ message: string }>) => {
      errorCallback(error.body.message);
    });
};
