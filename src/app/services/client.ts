import fetch from 'isomorphic-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  // type PasswordAuthMiddlewareOptions,
  // type ExistingTokenMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

interface IClientConfig extends ImportMetaEnv {
  VITE_CTP_API_URL: string;
  VITE_CTP_AUTH_URL: string;
  VITE_CTP_CLIENT_ID: string;
  VITE_CTP_CLIENT_SECRET: string;
  VITE_CTP_PROJECT_KEY: string;
  VITE_CTP_SCOPES: string;
}
export const clientConfig = import.meta.env as IClientConfig;

const projectKey = clientConfig.VITE_CTP_PROJECT_KEY;
const scopes = clientConfig.VITE_CTP_SCOPES.split(' ');
const clientID = clientConfig.VITE_CTP_CLIENT_ID;
const clientSecret = clientConfig.VITE_CTP_CLIENT_SECRET;

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: clientConfig.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: `${clientID}`,
    clientSecret: `${clientSecret}`,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: clientConfig.VITE_CTP_API_URL,
  fetch,
};

/*
// add 12/06
// Функция для получения параметров password flow
const getPasswordFlowOptions = (
  username: string,
  password: string
): PasswordAuthMiddlewareOptions => {
  return {
    host: clientConfig.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: clientID,
      clientSecret,
      user: {
        username,
        password,
      },
    },
    scopes,
    fetch,
  };
};

// Функция для аутентификации пользователя и сохранения токена
export const authenticateUser = async (
  username: string,
  password: string
): Promise<void> => {
  const passwordFlowOptions = getPasswordFlowOptions(username, password);
  const tokenClient = new ClientBuilder()
    .withPasswordFlow(passwordFlowOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware()
    .build();

  const tokenResponse = await tokenClient.execute({
    uri: '/oauth/token',
    method: 'POST',
    body: {
      grant_type: 'password',
      username,
      password,
    },
  });
  const token = tokenResponse.body.access_token;
  localStorage.setItem('access_token', token);
  console.log('Access token:', token);
};

// Функция для создания авторизованного клиента
export const createAuthenticatedClient = () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No access token available');
  }

  const clientAuthenticate = new ClientBuilder()
    .withProjectKey(projectKey)
    .withExistingTokenFlow(token, { force: true })
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware()
    .build();

  return clientAuthenticate;
};

// add 12/06
*/

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware()
  .build();
