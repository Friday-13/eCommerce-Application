import { clientConfig, ctpClient } from '@services/client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: clientConfig.VITE_CTP_PROJECT_KEY,
});

const getProject = () => {
  return apiRoot.get().execute();
};

getProject().then(console.log).catch(console.error);

export default apiRoot;