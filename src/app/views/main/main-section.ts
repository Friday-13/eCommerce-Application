import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';

export default class MainSectionView extends View {
  private _rowConteiner = new BaseComponent();

  private _header = new BaseComponent();

  private _content: BaseComponent | View;

  constructor(headerAttrs: IAttributes) {
    const attrs: IAttributes = {
      tag: 'section',
      classList: ['section white'],
    };
    super(attrs);

    this.addRowContainer();
    this.addHeader(headerAttrs);
    this._content = new BaseComponent({});
  }

  private addRowContainer() {
    const attrs: IAttributes = {
      classList: 'row container',
    };
    this._rowConteiner = new BaseComponent(attrs);
    this.appendChild(this._rowConteiner);
  }

  private addHeader(attrs: IAttributes) {
    this._header = new BaseComponent(attrs);
    this._rowConteiner.appendChild(this._header);
  }

  set content(newContent: BaseComponent | View) {
    this._rowConteiner.node.innerHTML = '';
    this._rowConteiner.appendChild(this._header);
    this._content = newContent;

    if (this._content instanceof BaseComponent) {
      this._rowConteiner.appendChild(this._content);
    } else {
      this._rowConteiner.node.appendChild(this._content.htmlElement);
    }
  }

  appendContent(component: BaseComponent) {
    this._content.appendChild(component);
  }
}
