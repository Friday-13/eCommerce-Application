import { TokenStore } from '@commercetools/sdk-client-v2';

export function isTokenExist() {
  const tokenString = localStorage.getItem('access-token');
  return Boolean(tokenString);
}

export function loadSavedToken() {
  const tokenString = localStorage.getItem('access-token');
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
  localStorage.setItem('access-token', JSON.stringify(token));
}
