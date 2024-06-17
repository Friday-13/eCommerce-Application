import PageView from '@views/page-view';
import BasketTitleView from './basket-title';
import BasketContentView from './basket-content';
import BasketSummaryView from './basket-summary';

export default class BasketPageView extends PageView {
  private _title = new BasketTitleView(0);

  private _content = new BasketContentView();

  private _summary = new BasketSummaryView();

  constructor() {
    super();
    this.addTitle();
    this.addBasketContent();
    this.addOrderSummary();
  }

  addTitle() {
    this._title = new BasketTitleView(10);
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
