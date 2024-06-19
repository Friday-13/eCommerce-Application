import { ICartData } from '@models/cart';
import { Cart } from '@commercetools/platform-sdk';
import CookieManager from '@utils/cookie';
import LocalStorageManager from '@utils/local-cart-id';
import {
  createAnonymousCart,
  createCustomerCart,
  isCustomerCartExist,
  removeProductFromCart,
} from './carts';
import { createCartData, getCartById } from './cart-data';
import { addProductToCart } from './add-product-cart';

class CurrentCart {
  cartData: ICartData;

  public currentCartId?: string;

  public currentCartVersion?: number;

  private _userId?: string;

  constructor(userId?: string) {
    this.initCurrentCart(userId);
  }

  public initCurrentCart(userId?: string) {
    console.log(`Initializing ID ${userId}`);
    this._userId = userId;
    if (userId) {
      this.loadCustomerCart(userId);
      LocalStorageManager.removeAnonymusCart();
    } else {
      this.loadAnonymusCart();
    }
  }

  private loadCustomerCart(userId: string) {
    isCustomerCartExist(
      userId,
      this.updateCartData.bind(this),
      this.createCustomerCart.bind(this)
    );
  }

  private loadAnonymusCart() {
    const savedCart = localStorage.getItem('anonymousCart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      this.currentCartId = cartData.currentCartId as string;
      this.currentCartVersion = cartData.currentCartVersion;
      getCartById(this.currentCartId, this.updateCartData.bind(this), (msg) => {
        console.log(`Error on loading local cart: ${msg} `);
      });
    } else {
      createAnonymousCart(this.updateCartData.bind(this), () => {
        console.log('Problem on creating');
      });
    }
  }

  updateCartData(cart: Cart) {
    this.currentCartId = cart.id;
    this.currentCartVersion = cart.version;
    this.cartData = createCartData(cart);
    this.saveCartToLocalStorage();
    console.log(this.cartData);
  }

  public saveCartToLocalStorage(): void {
    const cartData = {
      currentCartId: this.currentCartId,
      currentCartVersion: this.currentCartVersion,
    };
    localStorage.setItem('anonymousCart', JSON.stringify(cartData));
  }

  addProduct(productId: string, quantity: number) {
    addProductToCart(
      this.cartData.id,
      this.cartData.version,
      productId,
      quantity,
      this.updateCartData.bind(this),
      (msg) => {
        console.log(`Error on adding ${msg}`);
      }
    );
  }

  removeProduct(productId: string, quantity?: number) {
    removeProductFromCart(
      this.cartData.id,
      this.cartData.version,
      productId,
      this.updateCartData.bind(this),
      (msg) => {
        console.log(`Error on adding ${msg}`);
      },
      quantity
    );
  }

  createCustomerCart(userId: string) {
    createCustomerCart(userId, this.updateCartData.bind(this), (msg) =>
      console.log(`Creating customer cart error ${msg}`)
    );
  }
}

const userId = CookieManager.getUserId();

const currentCart = new CurrentCart(userId);

export default currentCart;
