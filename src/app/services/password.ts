import { Customer, CustomerChangePassword } from '@commercetools/platform-sdk';
import apiRoot from './api-root';

const changeCustomerPassword = (
  customerId: string,
  version: number,
  currentPassword: string,
  newPassword: string
): Promise<Customer | null> => {
  const body: CustomerChangePassword = {
    id: customerId,
    version,
    currentPassword,
    newPassword,
  };

  return apiRoot
    .customers()
    .password()
    .post({ body })
    .execute()
    .then((response) => {
      // console.log('Password changed successfully:', response);
      return response;
    })
    .catch((error) => {
      // console.error('Error changing password:', error);
      return error;
    });
};

export default changeCustomerPassword;
