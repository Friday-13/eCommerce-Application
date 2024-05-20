import fetch from 'isomorphic-fetch';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  CustomerSignin,
} from '@commercetools/platform-sdk';

// const projectKey: string = process.env.CTP_PROJECT_KEY || '';
// const clientId: string = process.env.CTP_CLIENT_ID || '';
// const clientSecret: string = process.env.CTP_CLIENT_SECRET || '';
// const authUrl: string = process.env.CTP_AUTH_URL || '';
// const apiUrl: string = process.env.CTP_API_URL || '';
const projectKey = 'codecraft';
const clientId = 'TQkPgWWdSEP6AgSLuIa0vJP7';
const clientSecret = 'MQo0UrVH5H8wnU8voluDXX7bL1PbnwZW';
const authUrl = 'https://auth.europe-west1.gcp.commercetools.com';
const apiUrl = 'https://api.europe-west1.gcp.commercetools.com';

const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow({
    host: authUrl,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes: [`manage_project:${projectKey}`],
    fetch,
  })
  .withHttpMiddleware({
    host: apiUrl,
    fetch,
  })
  .build();

const apiRoot = createApiBuilderFromCtpClient(client);

async function login(email: string, password: string) {
  const customerSignin: CustomerSignin = {
    email,
    password,
  };

  const response = await apiRoot
    .withProjectKey({ projectKey })
    .login()
    .post({ body: customerSignin })
    .execute();

  if (response.statusCode === 200) {
    return response.body;
  }

  throw new Error('Login failed');
}

export default login;
