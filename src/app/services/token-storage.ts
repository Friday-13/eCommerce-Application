import { TokenStore } from '@commercetools/sdk-client-v2';

const TOKEN_KEY = 'access-token';

export function isTokenExist() {
  const tokenString = localStorage.getItem(TOKEN_KEY);
  return Boolean(tokenString);
}

export function loadSavedToken() {
  const tokenString = localStorage.getItem(TOKEN_KEY);
  let token: TokenStore;
  if (!isTokenExist()) {
    token = {
      token: '',
      expirationTime: 0,
    };
  }
  token = JSON.parse(tokenString as string);
  return token;
}

export function saveToken(token: TokenStore) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
