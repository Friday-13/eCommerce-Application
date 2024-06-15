import { clientConfig, apiClient } from '@services/client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Client, UserAuthOptions } from '@commercetools/sdk-client-v2';
import { isTokenExist } from './token-storage';

class ApiRoot {
  static get root() {
    if (isTokenExist()) {
      return ApiRoot.refreshTokenRoot;
    }
    return ApiRoot.anonymusRoot;
  }

  static get anonymusRoot() {
    return createApiBuilderFromCtpClient(
      apiClient.getAnonymusFlowClient()
    ).withProjectKey({
      projectKey: clientConfig.VITE_CTP_PROJECT_KEY,
    });
  }

  static get refreshTokenRoot() {
    return createApiBuilderFromCtpClient(
      apiClient.getRefreshTokenFlowClient()
    ).withProjectKey({
      projectKey: clientConfig.VITE_CTP_PROJECT_KEY,
    });
  }

  static getPasswordRoot(user: UserAuthOptions) {
    const client = apiClient.getPasswordFlowClient(user);
    const root = ApiRoot.generateRoot(client);
    return root;
  }

  private static generateRoot(client: Client) {
    const root = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: clientConfig.VITE_CTP_PROJECT_KEY,
    });
    return root;
  }
}

export default ApiRoot;
