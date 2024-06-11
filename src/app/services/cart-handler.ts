import { addProductToCart } from './add-product-cart';
import { createAnonymousCart, createCustomerCart } from './carts';

class CartHandler {
  private currentCartId: string | null = null;

  private currentCartVersion: number | null = null;

  private userId: string | null = null;

  constructor(userId: string | null) {
    this.userId = userId;
    this.loadCartFromLocalStorage();
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
          this.saveCartToLocalStorage();
          this.addProductToExistingCart(
            this.currentCartId,
            this.currentCartVersion,
            productId,
            quantity
          );
        },
        (errorMessage) => {
          console.error('Error creating user cart:', errorMessage);
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
          console.error('Error creating anonymous cart:', errorMessage);
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
        this.saveCartToLocalStorage();
        console.log('Product added to cart:', cartData);
      },
      (errorMessage) => {
        console.error('Error adding product to cart:', errorMessage);
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

  private loadCartFromLocalStorage(): void {
    const savedCart = localStorage.getItem('anonymousCart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      this.currentCartId = cartData.currentCartId;
      this.currentCartVersion = cartData.currentCartVersion;
    }
  }
}

export default CartHandler;
