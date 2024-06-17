import { clearCustomer } from '@models/customer';
import { clearToken } from './token-storage';

function logoutCustomer() {
  clearCustomer();
  clearToken();
}

export default logoutCustomer;
