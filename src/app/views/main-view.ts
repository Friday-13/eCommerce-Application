import { IAttributes } from '@components/base-component';
import View from './view';

export default class MainView extends View {
  private _page = new View({});

  constructor() {
    const attrs: IAttributes = {
      classList: 'main',
      tag: 'main',
    };
    super(attrs);
  }

  set page(newPage: View) {
    this.removeContent();
    this.appendChild(newPage);
    this._page = newPage;
  }

  get page(): View {
    return this._page;
  }
}
