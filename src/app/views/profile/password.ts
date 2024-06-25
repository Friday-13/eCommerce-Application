import { Customer, CustomerChangePassword } from '@commercetools/platform-sdk';
import apiRoot from '@services/api-root';

const changeCustomerPassword = async (
  customerId: string,
  version: number,
  currentPassword: string,
  newPassword: string
): Promise<Customer | null | undefined> => {
  const body: CustomerChangePassword = {
    id: customerId,
    version,
    currentPassword,
    newPassword,
  };

  try {
    const response = await apiRoot.root
      .customers()
      .password()
      .post({ body })
      .execute();
    const customer = response.body as Customer;

    console.log('Password changed successfully:', customer);
    return customer;
  } catch (error) {
    console.error('Error changing password:', error);
    if (error instanceof TypeError) {
      return null;
    }
    throw error;
  }
};

export default changeCustomerPassword;
