import PageView from '@views/page-view';
import { ICartData } from '@models/cart';
import { getCartById } from '@services/cart-data';
import { showErrorMessage } from '@utils/toast-messages';
import BasketTitleView from './basket-title';
import BasketContentView from './basket-content';
import BasketSummaryView from './basket-summary';

export default class BasketPageView extends PageView {
  private _title = new BasketTitleView(0);

  private _content: BasketContentView | null = null;

  private _summary: BasketSummaryView | null = null;

  private cartId: string;

  private cartData?: ICartData | null = null;

  constructor(cartId: string) {
    super();
    this.cartId = cartId;
    this.addTitle();
    this.loadCartData(() => {
      this.initializeBasketContent();
    });
  }

  private loadCartData(callback: () => void): void {
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
  }

  private initializeBasketContent = (): void => {
    this.addBasketContent();
    this.addOrderSummary();
  };

  addTitle() {
    this._title = new BasketTitleView(10);
    this._pageWrapper.appendChild(this._title);
  }

  addBasketContent() {
    if (!this.cartData) return;
    this._content = new BasketContentView(this.cartData);
    this._pageWrapper.appendChild(this._content);
  }

  addOrderSummary() {
    if (!this.cartData) return;
    this._summary = new BasketSummaryView(this.cartData);
    this._pageWrapper.appendChild(this._summary);
  }
}
