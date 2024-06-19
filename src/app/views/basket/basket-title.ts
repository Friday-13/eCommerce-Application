import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';

const HEADER_TEXT = 'My Basket';

export default class BasketTitleView extends View {
  private _header = new BaseComponent({});

  constructor() {
    const attrs: IAttributes = {
      classList: 'col s12',
    };
    super(attrs);
    this.addHeader();
  }

  addHeader() {
    const attrs: IAttributes = {
      tag: 'h5',
      content: HEADER_TEXT,
    };
    this._header = new BaseComponent(attrs);
    this.appendChild(this._header);
  }
}
