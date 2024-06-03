import { Customer } from '@commercetools/platform-sdk';
import apiRoot from './api-root';

export const getCustomer = async (
  customerId: string
): Promise<Customer | null> => {
  const response = await apiRoot
    .customers()
    .withId({ ID: customerId })
    .get()
    .execute();
  const customerData = response.body;
  if (customerData) {
    return customerData;
  }

  throw new Error(`HTTP ${response.statusCode}`);
};

export default getCustomer;
