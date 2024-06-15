import { Customer } from '@commercetools/platform-sdk';
import ApiRoot from './api-root';

export const getCustomer = async (): Promise<Customer | null> => {
  const response = await ApiRoot.refreshTokenRoot.me().get().execute();
  const customerData = response.body;
  if (customerData) {
    return customerData;
  }

  throw new Error(`HTTP ${response.statusCode}`);
};

export default getCustomer;
