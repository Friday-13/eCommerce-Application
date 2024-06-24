export default class LocalStorageManager {
  static CART_KEY = 'cartId'; // Ключ для cartId в localStorage

  // Сохранение cartId в localStorage
  static setCartId(cartId: string) {
    localStorage.setItem(this.CART_KEY, cartId);
  }

  // Получение cartId из localStorage
  static getCartId(): string | null {
    return localStorage.getItem(this.CART_KEY);
  }

  // Удаление cartId из localStorage
  static clearCartId() {
    localStorage.removeItem(this.CART_KEY);
  }

  static removeAnonymusCart() {
    localStorage.removeItem('anonymousCart');
  }
}
