import fetch from 'isomorphic-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import tokenCache from './token-cache';

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

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: clientConfig.VITE_CTP_API_URL,
  fetch,
};

const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: clientConfig.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: clientID,
    clientSecret,
  },
  scopes,
  fetch,
};

const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  host: clientConfig.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: clientID,
    clientSecret,
    user: {
      password: '',
      username: '',
    },
  },
  scopes,
  fetch,
  tokenCache,
};

const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
  host: clientConfig.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: clientID,
    clientSecret,
  },
  fetch,
  refreshToken: '',
  tokenCache,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
  .withPasswordFlow(passwordAuthMiddlewareOptions)
  .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware()
  .build();
