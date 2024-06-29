import CookieManager from './cookie';

describe('CookieManager', () => {
  beforeEach(() => {
    // Очищаем cookies перед каждым тестом
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: '',
    });
  });

  test('should set a userId in cookies', () => {
    CookieManager.setUserId('12345');
    expect(document.cookie).toContain('userId=12345');
  });

  test('should get the correct userId from cookies', () => {
    document.cookie = 'userId=12345; path=/;';
    expect(CookieManager.getUserId()).toBe('12345');
  });

  test('should clear userId from cookies', () => {
    document.cookie = 'userId=12345; path=/;';
    CookieManager.clearUserId();
    expect(document.cookie).not.toContain('userId=12345');
    expect(CookieManager.getUserId()).toBeUndefined();
  });

  test('should verify if customer is authorized based on userId in cookies', () => {
    expect(CookieManager.isCustomerAuthorized()).toBeFalsy(); // Проверка при отсутствии userId
    document.cookie = 'userId=12345; path=/;';
    expect(CookieManager.isCustomerAuthorized()).toBeTruthy(); // Проверка после установки userId
    CookieManager.clearUserId();
    expect(CookieManager.isCustomerAuthorized()).toBeFalsy(); // Проверка после удаления userId
  });
});
