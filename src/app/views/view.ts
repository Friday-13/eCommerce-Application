import { BaseComponent, IAttributes } from '@components/base-component';

export default class View {
  protected _htmlElement = new BaseComponent({});

  constructor(attrs: IAttributes) {
    this.createHtmlElement(attrs);
  }

  createHtmlElement(attrs: IAttributes) {
    this._htmlElement = new BaseComponent(attrs);
    return new BaseComponent(attrs);
  }

  get htmlElement() {
    return this._htmlElement.node;
  }

  removeContent() {
    while (this._htmlElement.lastChild) {
      this._htmlElement.removeChild();
    }
  }

  setContent(content: View | BaseComponent) {
    this.removeContent();
    this.appendChild(content);
  }

  appendChild(child: View | BaseComponent) {
    const component = child instanceof View ? child._htmlElement : child;
    this._htmlElement.appendChild(component);
  }

  removeChild() {
    this._htmlElement.removeChild();
  }
}
