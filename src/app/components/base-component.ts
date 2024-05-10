import { AutoInit } from 'materialize-css';

export interface IAttributes {
  tag?: keyof HTMLElementTagNameMap;
  id?: string;
  classList?: string[] | string;
  content?: string;
}

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  #node: T;

  constructor(attributes: IAttributes = {}) {
    this.#node = document.createElement(attributes.tag ?? 'div') as T;
    if (attributes.id) {
      this.id = attributes.id;
    }

    if (attributes.classList) {
      if (attributes.classList instanceof Array) {
        this.#node.classList.value = attributes.classList.join(' ');
      } else {
        this.#node.classList.value = attributes.classList;
      }
    }

    if (attributes.content) {
      this.#node.textContent = attributes.content;
    }
    AutoInit(this.#node);
  }

  get node() {
    return this.#node;
  }

  get id() {
    return this.#node.id;
  }

  set id(id: string) {
    this.#node.id = id;
  }

  appendChild(child: BaseComponent) {
    this.#node.appendChild(child.#node);
  }

  get lastChild(): Node | null {
    return this.#node.lastChild;
  }

  removeChild(child?: Node | undefined) {
    if (!child) {
      if (this.lastChild) {
        this.#node.removeChild(this.lastChild);
      }
    } else {
      this.#node.removeChild(child);
    }
  }

  get textContent(): string {
    const text = this.#node.textContent;
    if (text) {
      return text;
    }
    return '';
  }

  set textContent(newText: string) {
    this.#node.textContent = newText;
  }

  addClass(className: string) {
    this.#node.classList.add(className);
  }

  removeClass(className: string) {
    this.#node.classList.remove(className);
  }
}
