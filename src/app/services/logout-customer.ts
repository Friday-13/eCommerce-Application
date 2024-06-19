import { clearCustomer } from '@models/customer';
import CookieManager from '@utils/cookie';
import currentCart from './current-cart';

function logoutCustomer() {
  clearCustomer();
  CookieManager.clearUserId();
  currentCart.initCurrentCart();
}

export default logoutCustomer;
