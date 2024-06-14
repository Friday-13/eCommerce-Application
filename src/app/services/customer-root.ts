import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { clientConfig, createPasswordFlowClient } from '@services/client';

export function createCustomerRoot(user: UserAuthOptions) {
  const customerRoot = createApiBuilderFromCtpClient(
    createPasswordFlowClient(user)
  ).withProjectKey({
    projectKey: clientConfig.VITE_CTP_PROJECT_KEY,
  });
  return customerRoot;
}
export default createCustomerRoot;
