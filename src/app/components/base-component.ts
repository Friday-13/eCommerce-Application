import { AutoInit } from 'materialize-css';

export interface IAttributes {
  tag?: keyof HTMLElementTagNameMap;
  id?: string;
  classList?: string[] | string;
  content?: string;
}

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected _node: T;

  constructor(attributes: IAttributes = {}) {
    this._node = document.createElement(attributes.tag ?? 'div') as T;
    if (attributes.id) {
      this.id = attributes.id;
    }

    if (attributes.classList) {
      if (attributes.classList instanceof Array) {
        this._node.classList.value = attributes.classList.join(' ');
      } else {
        this._node.classList.value = attributes.classList;
      }
    }

    if (attributes.content) {
      this._node.textContent = attributes.content;
    }
    AutoInit(this._node);
  }

  get node() {
    return this._node;
  }

  get id() {
    return this._node.id;
  }

  set id(id: string) {
    this._node.id = id;
  }

  appendChild(child: BaseComponent) {
    this._node.appendChild(child._node);
  }

  get lastChild(): Node | null {
    return this._node.lastChild;
  }

  removeChild(child?: Node | undefined) {
    if (!child) {
      if (this.lastChild) {
        this._node.removeChild(this.lastChild);
      }
    } else {
      this._node.removeChild(child);
    }
  }

  get textContent(): string {
    const text = this._node.textContent;
    if (text) {
      return text;
    }
    return '';
  }

  set textContent(newText: string) {
    this._node.textContent = newText;
  }

  addClass(className: string) {
    this._node.classList.add(className);
  }

  removeClass(className: string) {
    this._node.classList.remove(className);
  }

  public setValue(value: string): void {
    if (this.node instanceof HTMLInputElement) {
      this.node.value = value;
    } else {
      throw new Error(
        "'setValue called on an element that is not an HTMLInputElement'"
      );
    }
  }
}
