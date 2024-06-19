import PageView from '@views/page-view';
import currentCart from '@services/current-cart';
import CookieManager from '@utils/cookie';
import BasketTitleView from './basket-title';
import BasketContentView from './basket-content';
import BasketSummaryView from './basket-summary';

export default class BasketPageView extends PageView {
  private _title = new BasketTitleView(0);

  private _content: BasketContentView | null = null;

  private _summary: BasketSummaryView | null = null;

  constructor() {
    super();
    this.addTitle();
    if (currentCart.cartData) {
      this.initializeBasketContent();
    } else {
      const userId = CookieManager.getUserId();
      currentCart.initCurrentCart(
        userId,
        this.initializeBasketContent.bind(this)
      );
    }
  }

  private initializeBasketContent = (): void => {
    this.addBasketContent();
    this.addOrderSummary();
  };

  addTitle() {
    let countItemsInCart;
    if (currentCart.cartData) {
      countItemsInCart = currentCart.cartData.lineItems.length;
    } else {
      countItemsInCart = 0;
    }
    this._title = new BasketTitleView(countItemsInCart);
    this._pageWrapper.appendChild(this._title);
  }

  addBasketContent() {
    this._content = new BasketContentView();
    this._pageWrapper.appendChild(this._content);
  }

  addOrderSummary() {
    this._summary = new BasketSummaryView();
    this._pageWrapper.appendChild(this._summary);
  }
}
