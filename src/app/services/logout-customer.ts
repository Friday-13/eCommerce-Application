import { clearCustomer } from '@models/customer';
import CookieManager from '@utils/cookie';
import LocalStorageManager from '@utils/local-cart-id';
import currentCart from './current-cart';

function logoutCustomer() {
  clearCustomer();
  CookieManager.clearUserId();
  LocalStorageManager.removeAnonymusCart();
  currentCart.initCurrentCart();
}

export default logoutCustomer;
