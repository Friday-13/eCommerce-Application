import { clearCustomer } from '@models/customer';
import CookieManager from '@utils/cookie';

function logoutCustomer() {
  clearCustomer();
  CookieManager.clearUserId();
}

export default logoutCustomer;
