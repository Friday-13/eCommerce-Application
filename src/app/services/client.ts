import fetch from 'isomorphic-fetch';
import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  UserAuthOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { loadSavedToken, saveToken } from './token-storage';

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
//
const anonymusAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
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

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  // .withClientCredentialsFlow(authMiddlewareOptions)
  .withAnonymousSessionFlow(anonymusAuthMiddlewareOptions)
  // .withPasswordFlow(passwordAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware()
  .build();

function createPasswordAuthMiddlewareOptions(user: UserAuthOptions) {
  const options: PasswordAuthMiddlewareOptions = {
    host: clientConfig.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: `${clientID}`,
      clientSecret: `${clientSecret}`,
      user,
    },
    tokenCache: {
      get: loadSavedToken,
      set: saveToken,
    },
    scopes,
    fetch,
  };
  return options;
}

function createTokenAuthMiddlewareOptions() {
  const token = loadSavedToken();
  const options: RefreshAuthMiddlewareOptions = {
    host: clientConfig.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: `${clientID}`,
      clientSecret: `${clientSecret}`,
    },
    tokenCache: {
      get: loadSavedToken,
      set: saveToken,
    },
    refreshToken: token.token,
    fetch,
  };
  return options;
}

export function createPasswordFlowClient(user: UserAuthOptions) {
  const passwordAuthMiddlewareOptions =
    createPasswordAuthMiddlewareOptions(user);
  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware()
    .build();
  return client;
}

export function createTokenFlowClient() {
  const refreshTokenAuthMiddlewareOptions = createTokenAuthMiddlewareOptions();
  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withRefreshTokenFlow(refreshTokenAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware()
    .build();
  return client;
}
