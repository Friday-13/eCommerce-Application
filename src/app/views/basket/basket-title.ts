import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';

const HEADER_TEXT = 'My Basket';

export default class BasketTitleView extends View {
  private _productsCount = 0;

  private _header = new BaseComponent({});

  constructor(productsCount: number) {
    const attrs: IAttributes = {
      classList: 'col s12',
    };
    super(attrs);
    this.addHeader();
    this.productsCount = productsCount;
  }

  addHeader() {
    const attrs: IAttributes = {
      tag: 'h5',
    };
    this._header = new BaseComponent(attrs);
    this.appendChild(this._header);
  }

  set productsCount(newCount: number) {
    this._productsCount = newCount;
    this.updateHeaderText();
  }

  get productsCount() {
    return this._productsCount;
  }

  updateHeaderText() {
    this._header.textContent = `${HEADER_TEXT} (${this.productsCount})`;
  }
}
