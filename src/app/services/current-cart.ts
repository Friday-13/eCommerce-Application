import { ICartData } from '@models/cart';
import { Cart, DiscountCodeReference } from '@commercetools/platform-sdk';
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
import applyPromocodeToCart from './apply-promocode-to-cart';
import removePromocodeFromCart from './remove-promocode-from-cart';
import recalculateCart from './recalculate-cart';

class CurrentCart {
  cartData: ICartData;

  public currentCartId?: string;

  public currentCartVersion?: number;

  constructor(userId?: string) {
    this.initCurrentCart(userId);
  }

  public initCurrentCart(userId?: string, sucessCallback?: () => void) {
    console.log(`Initializing ID ${userId}`);
    if (userId) {
      this.loadCustomerCart(userId, sucessCallback);
      LocalStorageManager.removeAnonymusCart();
    } else {
      this.loadAnonymusCart(sucessCallback);
    }
  }

  private loadCustomerCart(userId: string, successCallback?: () => void) {
    isCustomerCartExist(
      userId,
      (cart: Cart) => {
        this.updateCartData(cart);
        if (successCallback) {
          successCallback();
        }
      },
      (id: string) => {
        this.createCustomerCart(id);
        if (successCallback) {
          successCallback();
        }
      }
    );
  }

  private loadAnonymusCart(successCallback?: () => void) {
    const savedCart = localStorage.getItem('anonymousCart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      this.currentCartId = cartData.currentCartId as string;
      this.currentCartVersion = cartData.currentCartVersion;
      getCartById(
        this.currentCartId,
        (cart: Cart) => {
          this.updateCartData(cart);
          if (successCallback) {
            successCallback();
          }
        },
        (msg) => {
          console.log(`Error on loading local cart: ${msg} `);
        }
      );
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
  }

  public saveCartToLocalStorage(): void {
    const cartData = {
      currentCartId: this.currentCartId,
      currentCartVersion: this.currentCartVersion,
    };
    localStorage.setItem('anonymousCart', JSON.stringify(cartData));
  }

  addProduct(
    productId: string,
    quantity: number,
    successCallback?: () => void
  ) {
    addProductToCart(
      this.cartData.id,
      this.cartData.version,
      productId,
      quantity,
      (cart: Cart) => {
        this.updateCartData(cart);
        if (successCallback) {
          successCallback();
        }
      },
      (msg) => {
        console.log(`Error on adding ${msg}`);
      }
    );
  }

  removeProduct(
    productId: string,
    successCallback?: () => void,
    quantity?: number
  ) {
    removeProductFromCart(
      this.cartData.id,
      this.cartData.version,
      productId,
      (cart: Cart) => {
        this.updateCartData(cart);
        if (successCallback) {
          successCallback();
        }
      },
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

  applyPromocode(
    promocode: string,
    sucessCallback: () => void,
    errorCallabck: () => void
  ) {
    applyPromocodeToCart(
      this.cartData.id,
      this.cartData.version,
      promocode,
      (cartData) => {
        this.updateCartData(cartData);
        sucessCallback();
      },
      errorCallabck
    );
  }

  isProductInside(productId: string) {
    console.log(`checking ${productId}`);
    const isInside = this.cartData.lineItems.reduce(
      (result, product) => result || product.productId === productId,
      false
    );
    return isInside;
  }

  removePromocode(
    promocode: DiscountCodeReference,
    sucessCallback: (cartData: Cart) => void,
    errorCallabck: () => void
  ) {
    removePromocodeFromCart(
      this.cartData.id,
      this.cartData.version,
      (cartData: Cart) => {
        this.updateCartData(cartData);
        sucessCallback(cartData);
      },
      errorCallabck,
      promocode
    );
  }

  removeAllPromocodes() {
    console.log('removing all promocodes');

    this.cartData.discountCodes.forEach((codeId) => {
      this.removePromocode(
        { id: codeId.id, typeId: 'discount-code' },
        () => {},
        () => {}
      );
    });
  }

  recalculate(
    sucessCallback: (cartData: Cart) => void,
    errorCallabck: () => void
  ) {
    recalculateCart(
      this.cartData.id,
      this.cartData.version,
      (cartData: Cart) => {
        this.updateCartData(cartData);
        sucessCallback(cartData);
      },
      errorCallabck
    );
  }
}
const userId = CookieManager.getUserId();

const currentCart = new CurrentCart(userId);

export default currentCart;
