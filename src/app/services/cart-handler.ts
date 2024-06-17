import { showSucessMessage } from '@utils/toast-messages';
import { addProductToCart } from './add-product-cart';
import { createAnonymousCart, createCustomerCart } from './carts';

class CartHandler {
  public currentCartId: string | null = null;

  private currentCartVersion: number | null = null;

  private userId: string | null = null;

  constructor(userId: string | null) {
    this.userId = userId;
    if (!userId) {
      this.loadCartFromLocalStorage();
    } else {
      this.loadCartFromServer(userId);
    }
  }

  public handleAddToCart(productId: string, quantity: number): void {
    if (!this.currentCartId || !this.currentCartVersion) {
      this.createCartAndAddProduct(productId, quantity);
    } else {
      this.addProductToExistingCart(
        this.currentCartId,
        this.currentCartVersion,
        productId,
        quantity
      );
    }
  }

  private createCartAndAddProduct(productId: string, quantity: number): void {
    if (this.userId) {
      createCustomerCart(
        this.userId,
        (cartData) => {
          this.currentCartId = cartData.id;
          this.currentCartVersion = cartData.version;
          this.addProductToExistingCart(
            this.currentCartId,
            this.currentCartVersion,
            productId,
            quantity
          );
        },
        (errorMessage) => {
          const SUCSESS_MSG = `Error creating user cart: ${errorMessage}`;
          showSucessMessage(SUCSESS_MSG);
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
          showSucessMessage(SUCSESS_MSG);
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
        this.currentCartId = cartData.id;
        this.currentCartVersion = cartData.version;
        console.log(
          `User ID before deciding to save to localStorage: ${this.userId}`
        );
        if (!this.userId) {
          this.saveCartToLocalStorage();
        }
        console.log('Product added to cart:', cartData);
      },
      (errorMessage) => {
        const SUCSESS_MSG = `Error adding product to cart: ${errorMessage}`;
        showSucessMessage(SUCSESS_MSG);
      }
    );
  }

  private saveCartToLocalStorage(): void {
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

  // метод для загрузки корзины зарегистрированного пользователя с сервера
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  private loadCartFromServer(userId: string): void {}
}

export default CartHandler;
