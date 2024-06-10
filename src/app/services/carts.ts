import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import apiRoot from './api-root';

// запрос на создание анон cart
// При успешном создании корзины вызывает successCallback с данными корзины.
export const createAnonymousCart = (
  successCallback: (cartData: Cart) => void,
  errorCallback: (message: string) => void
): void => {
  apiRoot
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
  apiRoot
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
    })
    .catch((error: ClientResponse<{ message: string }>) => {
      errorCallback(error.body.message);
    });
};
