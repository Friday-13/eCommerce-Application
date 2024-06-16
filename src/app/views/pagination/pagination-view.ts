import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';
import PaginationButtonView from './pagination-button';
import styles from './pagination.module.scss';

export default class PaginationView extends View {
  private _pagination = new BaseComponent({});

  private _buttons: Array<PaginationButtonView> = [];

  constructor() {
    const attrs: IAttributes = {
      classList: styles.paginationWrapper,
    };
    super(attrs);
    this.addPagination();
    for (let i = 1; i < 10; i += 1) {
      this.addNumberedButton(i);
    }
  }

  addNumberedButton(value: number) {
    const button = new PaginationButtonView(`${value}`, () => {
      button.active = true;
      this.deactiveOther(button);
    });

    this._buttons.push(button);
    if (value === 1) {
      button.active = true;
    }
    this._pagination.node.appendChild(button.htmlElement);
  }

  addPagination() {
    const attrs: IAttributes = {
      tag: 'ul',
      classList: 'pagination',
    };
    this._pagination = new BaseComponent(attrs);
    this.appendChild(this._pagination);
  }

  deactiveOther(currentButton: PaginationButtonView) {
    this._buttons.forEach((button) => {
      if (button !== currentButton) {
        button.inactivate();
      }
    });
  }
}
