import { showErrorMessage } from '@utils/toast-messages';
import CookieManager from '@utils/cookie';
import { addProductToCart } from './add-product-cart';
import { createAnonymousCart, createCustomerCart } from './carts';

class CartHandler {
  public currentCartId: string | null = null;

  public currentCartVersion: number | null = null;

  public currentCustomerCartId: string | null = null;

  public currentCustomerCartVersion: number | null = null;

  private userId: string | null = null;

  constructor(userId: string | null) {
    this.userId = userId;
    this.currentCartId = null;
    this.currentCartVersion = null;
    this.currentCustomerCartId = null;
    this.currentCustomerCartVersion = null;

    // if (!userId) {
    //   this.loadCartFromLocalStorage();
    // } else {
    //   this.loadCartAuthFromLocalStorage();
    // }
  }

  public handleAddToCart(productId: string, quantity: number): void {
    // Определяем, какие переменные корзины использовать
    let cartId;
    let cartVersion;

    if (this.userId) {
      // Проверка, зарегистрирован ли пользователь
      cartId = this.currentCustomerCartId;
      cartVersion = this.currentCustomerCartVersion;
    } else {
      // Для анонимных пользователей
      cartId = this.currentCartId;
      cartVersion = this.currentCartVersion;
    }

    if (!cartId || !cartVersion) {
      this.createCartAndAddProduct(productId, quantity);
    } else {
      this.addProductToExistingCart(cartId, cartVersion, productId, quantity);
    }
  }

  private createCartAndAddProduct(productId: string, quantity: number): void {
    if (this.userId) {
      createCustomerCart(
        this.userId,
        (cartData) => {
          this.currentCustomerCartId = cartData.id;
          this.currentCustomerCartVersion = cartData.version;
          this.saveCartAuthToLocalStorage();
          this.addProductToExistingCart(
            this.currentCustomerCartId,
            this.currentCustomerCartVersion,
            productId,
            quantity
          );
        },
        (errorMessage) => {
          const SUCSESS_MSG = `Error creating user cart: ${errorMessage}`;
          showErrorMessage(SUCSESS_MSG);
        }
      );
    } else {
      createAnonymousCart(
        (cartData) => {
          this.currentCartId = cartData.id;
          this.currentCartVersion = cartData.version;
          this.saveCartToLocalStorage();
          this.addProductToExistingCart(
            this.currentCartId,
            this.currentCartVersion,
            productId,
            quantity
          );
        },
        (errorMessage) => {
          const SUCSESS_MSG = `Error creating anonymous cart: ${errorMessage}`;
          showErrorMessage(SUCSESS_MSG);
        }
      );
    }
  }

  private addProductToExistingCart(
    cartId: string,
    cartVersion: number,
    productId: string,
    quantity: number
  ): void {
    addProductToCart(
      cartId,
      cartVersion,
      productId,
      quantity,
      (cartData) => {
        if (this.userId) {
          // Для зарегистрированных пользователей
          this.currentCustomerCartId = cartData.id;
          this.currentCustomerCartVersion = cartData.version;
          this.saveCartAuthToLocalStorage();
        } else {
          // Для анонимных пользователей
          this.currentCartId = cartData.id;
          this.currentCartVersion = cartData.version;
          this.saveCartToLocalStorage();
        }
        console.log('Product added to cart:', cartData);
      },
      (errorMessage) => {
        const SUCSESS_MSG = `Error adding product to cart: ${errorMessage}`;
        showErrorMessage(SUCSESS_MSG);
      }
    );
  }

  public saveCartToLocalStorage(): void {
    const cartData = {
      currentCartId: this.currentCartId,
      currentCartVersion: this.currentCartVersion,
    };
    localStorage.setItem('anonymousCart', JSON.stringify(cartData));
  }

  public loadCartFromLocalStorage(): void {
    const savedCart = localStorage.getItem('anonymousCart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      this.currentCartId = cartData.currentCartId;
      this.currentCartVersion = cartData.currentCartVersion;
    }
  }

  public saveCartAuthToLocalStorage(): void {
    const cartData = {
      currentCustomerCartId: this.currentCustomerCartId,
      currentCustomerCartVersion: this.currentCustomerCartVersion,
    };
    localStorage.setItem('customerCart', JSON.stringify(cartData));
  }

  public loadCartAuthFromLocalStorage(): void {
    const savedCart = localStorage.getItem('customerCart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      this.currentCustomerCartId = cartData.currentCustomerCartId;
      this.currentCustomerCartVersion = cartData.currentCustomerCartVersion;
    }
  }
}

const userId = CookieManager.getUserId();

const cartHandler = new CartHandler(userId);

export default cartHandler;
