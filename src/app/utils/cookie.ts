export default class CookieManager {
  // Установка userId в cookie
  static setUserId(userId: string) {
    const days = 14; // Срок жизни cookie, например, 14 дней
    const expires = new Date(Date.now() + days * 86400000).toUTCString(); // Вычисляем время истечения cookie
    document.cookie = `userId=${encodeURIComponent(userId)}; expires=${expires}; path=/; Secure; HttpOnly`;
  }

  // Получение userId из cookie
  static getUserId(): string | null {
    const match = document.cookie.match(/(^|;\s*)userId=([^;]+)/);
    return match ? decodeURIComponent(match[2]) : null;
  }

  // Очистка userId из cookie
  static clearUserId() {
    document.cookie =
      'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly';
  }
}
