import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { clientConfig, createTokenFlowClient } from './client';

export function createTokenRoot() {
  const tokenRoot = createApiBuilderFromCtpClient(
    createTokenFlowClient()
  ).withProjectKey({
    projectKey: clientConfig.VITE_CTP_PROJECT_KEY,
  });
  return tokenRoot;
}
export default createTokenRoot;
