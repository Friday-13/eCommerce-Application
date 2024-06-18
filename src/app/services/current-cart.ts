import { ICartData } from '@models/cart';
import { Cart } from '@commercetools/platform-sdk';
import { createAnonymousCart } from './carts';
import { createCartData, getCartById } from './cart-data';
import { addProductToCart } from './add-product-cart';

class CurrentCart {
  cartData: ICartData;

  public currentCartId?: string;

  public currentCartVersion?: number;

  constructor(userId?: string) {
    if (userId) {
      // TODO: Load from server
    } else {
      this.loadAnonymusCart();
    }
  }

  // private loadCustomerCart(userId: string) {
  //   // TODO: Check if cart exist
  //   // TODO: Create if doesn't exist
  //   // TODO: Get cart, save to cart data
  // }

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

  addProductToAnonymus(productId: string, quantity: number) {
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
}

const currentCart = new CurrentCart();

export default currentCart;
