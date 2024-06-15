import { getCustomerToken } from '@models/customer';
import ApiRoot from './api-root';
import CartHandler from './cart-handler';

export default function getCart() {
  const customer = getCustomerToken();
  const cart = new CartHandler(customer.id);
  cart.loadCartFromLocalStorage();
  console.log(cart);
  ApiRoot.root
    .carts()
    .withId({ ID: cart.id })
    .get()
    .execute()
    .then((response) => {
      console.log(response.body);
    });
}
