import { BaseComponent, IAttributes } from '@components/base-component';
import {
  ButtonComponent,
  IButtonAttributes,
} from '@components/button-component';
import {
  ButtonWithIconComponent,
  IButtonWithIconAttributes,
} from '@components/button-with-icons';
import currentCart from '@services/current-cart';
import View from '@views/view';
import styles from './basket-clear.module.scss';
import BasketContentView from './basket-content';

export default class BasketClearView extends View {
  private _submitBlock = new BaseComponent({});

  private _updateCallback: () => void;

  private _productListView?: BasketContentView;

  constructor(updateCallback: () => void, productListView?: BasketContentView) {
    super({
      classList: styles.basketClear,
    });
    this._updateCallback = updateCallback;
    this._productListView = productListView;
    this.addClearButton();
    this.addSubmitBlock();
  }

  addClearButton() {
    const attrs: IButtonAttributes = {
      classList: 'waves-effect waves-light btn red lighten-2',
      content: 'Clear cart',
      onClick: () => {
        this._submitBlock.removeClass(styles.basketClearSubmitHidden);
      },
    };
    const clearButton = new ButtonComponent(attrs);
    this.appendChild(clearButton);
  }

  addSubmitBlock() {
    const attrs: IAttributes = {
      classList: [styles.basketClearSubmit, styles.basketClearSubmitHidden],
    };
    this._submitBlock = new BaseComponent(attrs);
    this.appendChild(this._submitBlock);
    this.addCancelButton();
    this.addSubmitButton();
  }

  addCancelButton() {
    const attrs: IButtonWithIconAttributes = {
      classList: 'waves-effect waves-light btn-small red lighten-2',
      onClick: () => {
        this._submitBlock.addClass(styles.basketClearSubmitHidden);
      },
      icon: 'clear',
    };
    const cancelButton = new ButtonWithIconComponent(attrs);
    this._submitBlock.appendChild(cancelButton);
  }

  addSubmitButton() {
    const attrs: IButtonWithIconAttributes = {
      classList: 'waves-effect waves-light btn-small red lighten-2',
      onClick: () => {
        currentCart.removeCart(() => {
          this._updateCallback();
          this._productListView?.updateProducts();
        });
      },
      icon: 'done',
    };
    const cancelButton = new ButtonWithIconComponent(attrs);
    this._submitBlock.appendChild(cancelButton);
  }
}
