import fetch from 'isomorphic-fetch';
// eslint-disable-next-line import/no-extraneous-dependencies
import SdkAuth from '@commercetools/sdk-auth';
import { clientConfig } from './client';

const AUTH_TOKEN_KEY = 'authToken';

interface IUserCredentials {
  email: string;
  password: string;
}

const sdkAuth = new SdkAuth({
  host: clientConfig.VITE_CTP_AUTH_URL,
  projectKey: clientConfig.VITE_CTP_PROJECT_KEY,
  credentials: {
    clientId: clientConfig.VITE_CTP_CLIENT_ID,
    clientSecret: clientConfig.VITE_CTP_CLIENT_SECRET,
  },
  fetch,
});

export async function getUserToken(
  credentials: IUserCredentials
): Promise<string> {
  console.log('getUserToken called with credentials:', credentials);
  const tokenResponse = await sdkAuth.customerPasswordFlow({
    email: credentials.email,
    password: credentials.password,
  });

  console.log('Token response:', tokenResponse);

  if (!tokenResponse.access_token) {
    throw new Error('Failed to fetch token');
  }

  return tokenResponse.access_token;
}

// Функция для получения токена и сохранения его в локальное хранилище
export async function fetchAndStoreUserToken(
  email: string,
  password: string
): Promise<void> {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const credentials: IUserCredentials = {
    email,
    password,
  };

  try {
    console.log(
      'Attempting to fetch user token with credentials:',
      credentials
    );
    const token = await getUserToken(credentials);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    console.log('User token fetched and stored successfully.');
  } catch (error) {
    console.error('Error occurred while fetching user token:', error);
    throw new Error('Failed to fetch user token.');
  }
}
