import { clientConfig, ctpClient } from '@services/client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: clientConfig.VITE_CTP_PROJECT_KEY,
});

const getProject = () => {
  return apiRoot.get().execute();
};

getProject().then(console.log).catch(console.error);

// apiRoot
//   .login()
//   .post({
//     body: {
//       email: 'hehehe@example.com',
//       password: 'examplePassword',
//     },
//   })
//   .execute()
//
//   .then(({ body }) => {
//     console.log(body.customer);
//   })
//   .catch(console.error);

// apiRoot
//   .customers()
//   .post({
//     body: {
//       email: 'hehehe@example.com',
//       password: 'examplePassword',
//     },
//   })
//   .execute()
//   .then(({ body }) => {
//     console.log(body.customer);
//   })
//   .catch(console.error);
//
