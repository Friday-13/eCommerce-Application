import { IAttributes } from '@components/base-component';
import View from '@views/view';

export default class PageView extends View {
  protected _pageWrapper = new View({});

  constructor() {
    const attrs: IAttributes = {
      classList: 'row',
    };
    super(attrs);
    this.addWrapper();
  }

  addWrapper() {
    const attrs: IAttributes = {
      classList: ['col', 's12', 'm10', 'offset-m1'],
    };
    this._pageWrapper = new View(attrs);
    this.appendChild(this._pageWrapper);
  }
}
