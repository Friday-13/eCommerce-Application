import { getCustomerToken } from '@models/customer';
import apiRoot from './api-root';
import CartHandler from './cart-handler';

export default function getCart() {
  const customer = getCustomerToken();
  const cart = new CartHandler(customer.id);
  cart.loadCartFromLocalStorage();
  console.log(cart);
  apiRoot
    .carts()
    .withId({ ID: cart.id })
    .get()
    .execute()
    .then((response) => {
      console.log(response.body);
    });
}
