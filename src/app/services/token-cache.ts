import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

// Реализация TokenCache
const tokenCache: TokenCache = {
  get: (): TokenStore => {
    const token = localStorage.getItem('commercetools_token');
    if (token) {
      const parsedToken = JSON.parse(token);
      return {
        token: parsedToken.access_token,
        expirationTime: parsedToken.expires_at,
        refreshToken: parsedToken.refresh_token,
      };
    }
    // Возвращаем объект TokenStore с пустыми значениями, если токен отсутствует
    return {
      token: '',
      expirationTime: 0,
    };
  },
  set: (token: TokenStore): void => {
    const tokenToStore = {
      access_token: token.token,
      expires_at: token.expirationTime,
      refresh_token: token.refreshToken,
    };
    localStorage.setItem('commercetools_token', JSON.stringify(tokenToStore));
  },
};

export default tokenCache;
