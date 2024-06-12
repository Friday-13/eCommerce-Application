import fetch from 'isomorphic-fetch';
// eslint-disable-next-line import/no-extraneous-dependencies
import SdkAuth from '@commercetools/sdk-auth';
import { getCustomerToken } from '@models/customer';
import { clientConfig } from './client';

const AUTH_TOKEN_KEY = 'authToken';

interface IUserCredentials {
  username: string;
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
  const tokenResponse = await sdkAuth.customerPasswordFlow({
    username: credentials.username,
    password: credentials.password,
  });

  if (!tokenResponse.access_token) {
    throw new Error('Failed to fetch token');
  }

  return tokenResponse.access_token;
}

// Функция для получения токена и сохранения его в локальное хранилище
export async function fetchAndStoreUserToken(): Promise<void> {
  const customerData = getCustomerToken();
  console.log('Customer data from localStorage:', customerData);
  if (!customerData) {
    throw new Error('No customer data found in localStorage.');
  }

  if (!customerData.email || !customerData.password) {
    throw new Error('Customer data is missing required fields.');
  }

  const credentials: IUserCredentials = {
    username: customerData.email,
    password: customerData.password,
  };

  console.log('Credentials for token request:', credentials);

  try {
    const token = await getUserToken(credentials);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    console.log('Token saved to localStorage:', token);
  } catch (error) {
    console.error('Error fetching user token:', error);
    throw new Error('Failed to fetch user token.');
  }
}
