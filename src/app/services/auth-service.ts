import apiRoot from './api-root';
import { passwordAuthMiddlewareOptions } from './client';

// Функция для обновления учетных данных в PasswordAuthMiddlewareOptions
export const updatePasswordAuthMiddlewareOptions = (
  email: string,
  password: string
) => {
  passwordAuthMiddlewareOptions.credentials.user.username = email;
  passwordAuthMiddlewareOptions.credentials.user.password = password;
};

// Функция для аутентификации пользователя
export const loginUser = async (
  email: string,
  password: string
): Promise<void> => {
  updatePasswordAuthMiddlewareOptions(email, password);
  try {
    // Выполнение запроса для аутентификации пользователя
    const response = await apiRoot.me().get().execute();
    console.log('Authenticated user:', response.body);

    // Получение заголовков из ответа
    const headers = response.headers as Headers;

    // Получение значения заголовка Authorization
    const token = headers.get('Authorization');
    if (token) {
      console.log('Access Token:', token);
      localStorage.setItem('accessToken', token);
    } else {
      console.error('Authorization header is missing in the response');
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
