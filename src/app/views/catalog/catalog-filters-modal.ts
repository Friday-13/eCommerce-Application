import { IAttributes } from '@components/base-component';
import View from '@views/view';
import { Modal } from 'materialize-css';

export default class CatalogFiltersView extends View {
  private _content = new View({});
  constructor() {
    const attrs: IAttributes = {
      id: 'modal-filter',
      classList: 'modal',
    };
    super(attrs);
    this.addContent();
    Modal.init(this.htmlElement);
  }

  addContent() {
    const attrs: IAttributes = {
      classList: 'modal-content',
      content: 'hehehehe',
    };
    this._content = new View(attrs);
    this.appendChild(this._content);
  }
}
