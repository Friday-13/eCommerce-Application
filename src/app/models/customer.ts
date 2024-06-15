import { Customer } from '@commercetools/platform-sdk';

export interface ICustomerBase {
  id: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

const CUSTOMER_KEY = 'codecraft-customer';

export const saveCustomerToken = (customer: ICustomerBase) => {
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
};

export const getCustomerToken = (): ICustomerBase => {
  const customerString = localStorage.getItem(CUSTOMER_KEY);
  let customer;
  if (customerString) {
    customer = JSON.parse(customerString);
  }
  return customer;
};

export const isCustomerAuthorized = (): boolean => {
  return Boolean(getCustomerToken());
};

export const customerTokenResponse = (
  customer: Customer
): ICustomerBase | undefined => {
  const customerToken: ICustomerBase = {
    id: customer.id,
    email: customer.email,
    password: customer.password,
    lastName: customer.lastName,
    firstName: customer.firstName,
  };
  return customerToken;
};

export const clearCustomer = () => {
  localStorage.removeItem(CUSTOMER_KEY);
};
