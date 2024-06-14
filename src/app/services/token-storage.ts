import { TokenStore } from '@commercetools/sdk-client-v2';

export function loadSavedToken() {
  const tokenString = localStorage.getItem('access-token');
  let token: TokenStore;
  if (tokenString) {
    token = JSON.parse(tokenString);
  } else {
    token = { token: '', refreshToken: '', expirationTime: 0 };
  }
  console.log(token);
  return token;
}

export function saveToken(token: TokenStore) {
  localStorage.setItem('access-token', JSON.stringify(token));
}
