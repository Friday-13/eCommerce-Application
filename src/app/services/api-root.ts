import ctpClient from '@services/client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = 'codecraft';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: `${projectKey}`,
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
const getProject = () => {
  return apiRoot.get().execute();
};

// Retrieve Project information and output the result to the log
getProject().then(console.log).catch(console.error);
