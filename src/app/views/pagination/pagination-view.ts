import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';
import PaginationButtonView from './pagination-button';
import styles from './pagination.module.scss';

export default class PaginationView extends View {
  private _pagination = new BaseComponent({});

  private _buttons: Array<PaginationButtonView> = [];

  private _onButtonClick: () => void;

  pageNumber: number = 0;

  constructor(onButtonClick: () => void) {
    const attrs: IAttributes = {
      classList: styles.paginationWrapper,
    };
    super(attrs);
    this.addPagination();
    this._onButtonClick = () => {
      onButtonClick();
    };
  }

  addPagination() {
    const attrs: IAttributes = {
      tag: 'ul',
      classList: 'pagination',
    };
    this._pagination = new BaseComponent(attrs);
    this.appendChild(this._pagination);
  }

  addNumberedButton(value: number) {
    const button = new PaginationButtonView(value, () => {
      this.pageNumber = value;
      this._onButtonClick();
      button.active = true;
      this.deactiveOther(button);
    });

    this._buttons.push(button);
    if (value === 0) {
      button.active = true;
    }
    this._pagination.node.appendChild(button.htmlElement);
  }

  deactiveOther(currentButton: PaginationButtonView) {
    this._buttons.forEach((button) => {
      if (button !== currentButton) {
        button.inactivate();
      }
    });
  }

  updateButtons(maxValue: number) {
    this._pagination.textContent = '';
    this._buttons = [];
    this.pageNumber = 0;
    if (maxValue > 1) {
      for (let i = 0; i < maxValue; i += 1) {
        this.addNumberedButton(i);
      }
    }
  }
}
