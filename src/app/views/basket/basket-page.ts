import PageView from '@views/page-view';
import { ICartData } from '@models/cart';
import { getCartById } from '@services/cart-data';
import { showErrorMessage } from '@utils/toast-messages';
import LocalStorageManager from '@utils/local-cart-id';
import BasketTitleView from './basket-title';
import BasketContentView from './basket-content';
import BasketSummaryView from './basket-summary';

export default class BasketPageView extends PageView {
  private _title = new BasketTitleView(0);

  private _content: BasketContentView | null = null;

  private _summary: BasketSummaryView | null = null;

  private cartId?: string;

  private cartData?: ICartData;

  constructor() {
    super();
    const cartId = LocalStorageManager.getCartId();
    if (cartId) {
      this.cartId = cartId;
    }
    this.addTitle();
    this.loadCartData(() => {
      this.initializeBasketContent();
    });
  }

  private loadCartData(callback: () => void): void {
    if (this.cartId) {
      getCartById(
        this.cartId,
        (cartData: ICartData) => {
          console.log('Cart data loaded:', cartData);
          this.cartData = cartData;
          callback();
        },
        (errorMsg: string) => {
          showErrorMessage(`Error fetching product details: ${errorMsg}`);
        }
      );
    } else {
      this.initializeBasketContent();
    }
  }

  private initializeBasketContent = (): void => {
    this.addBasketContent();
    this.addOrderSummary();
  };

  addTitle() {
    let countItemsInCart;
    if (this.cartData) {
      countItemsInCart = this.cartData.lineItems.length;
    } else {
      countItemsInCart = 0;
    }
    this._title = new BasketTitleView(countItemsInCart);
    this._pageWrapper.appendChild(this._title);
  }

  addBasketContent() {
    // if (!this.cartData) return;
    this._content = new BasketContentView(this.cartData);
    this._pageWrapper.appendChild(this._content);
  }

  addOrderSummary() {
    // if (!this.cartData) return;
    this._summary = new BasketSummaryView(this.cartData);
    this._pageWrapper.appendChild(this._summary);
  }
}
