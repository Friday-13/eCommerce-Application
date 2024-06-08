import fetch from 'isomorphic-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
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

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware() // Include middleware for logging
  .build();
