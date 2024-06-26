import fetch from 'isomorphic-fetch';
import {
  AnonymousAuthMiddlewareOptions,
  Client,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  UserAuthOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { isTokenExist, loadSavedToken, saveToken } from './token-storage';

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

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: clientConfig.VITE_CTP_API_URL,
  fetch,
};

export class ApiClient {
  private _anonymusClient: Client;

  private _tokenClient: Client;

  get client(): Client {
    if (isTokenExist()) {
      return this.getRefreshTokenFlowClient();
    }
    return this.getAnonymusFlowClient();
  }

  getAnonymusFlowClient() {
    this.createAnonimusClient();
    return this._anonymusClient;
  }

  getRefreshTokenFlowClient() {
    if (!this._tokenClient) {
      this.createTokenClient();
    }
    return this._tokenClient;
  }

  static getPasswordFlowClient(user: UserAuthOptions) {
    const options: PasswordAuthMiddlewareOptions = {
      host: anonymusAuthMiddlewareOptions.host,
      credentials: {
        ...anonymusAuthMiddlewareOptions.credentials,
        user,
      },
      fetch: anonymusAuthMiddlewareOptions.fetch,
      projectKey: anonymusAuthMiddlewareOptions.projectKey,
      tokenCache: {
        get: loadSavedToken,
        set: saveToken,
      },
      scopes,
    };
    const passwordClient = ApiClient.baseClient
      .withPasswordFlow(options)
      .build();
    return passwordClient;
  }

  createTokenClient() {
    const token = loadSavedToken();
    if (!token.refreshToken) {
      throw Error('No token!');
    }
    const options: RefreshAuthMiddlewareOptions = {
      host: anonymusAuthMiddlewareOptions.host,
      credentials: anonymusAuthMiddlewareOptions.credentials,
      fetch: anonymusAuthMiddlewareOptions.fetch,
      projectKey: anonymusAuthMiddlewareOptions.projectKey,
      tokenCache: {
        get: loadSavedToken,
        set: saveToken,
      },
      refreshToken: token.refreshToken,
    };
    this._tokenClient = ApiClient.baseClient
      .withRefreshTokenFlow(options)
      .build();
  }

  createAnonimusClient() {
    this._anonymusClient = ApiClient.baseClient
      .withAnonymousSessionFlow(anonymusAuthMiddlewareOptions)
      .build();
  }

  private static get baseClient() {
    return new ClientBuilder()
      .withProjectKey(projectKey)
      .withLoggerMiddleware()
      .withHttpMiddleware(httpMiddlewareOptions);
  }
}

export const apiClient = new ApiClient();
