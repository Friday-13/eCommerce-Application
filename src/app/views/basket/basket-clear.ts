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

export default class BasketClearView extends View {
  private _submitBlock = new BaseComponent({});

  private _updateCallback: () => void;

  constructor(updateCallbak: () => void) {
    super({});
    this._updateCallback = updateCallbak;
    this.addClearButton();
    this.addSubmitBlock();
  }

  addClearButton() {
    const attrs: IButtonAttributes = {
      classList: 'waves-effect waves-light btn red lighten-2',
      content: 'Clear cart',
      onClick: () => {},
    };
    const clearButton = new ButtonComponent(attrs);
    this.appendChild(clearButton);
  }

  addSubmitBlock() {
    const attrs: IAttributes = {};
    this._submitBlock = new BaseComponent(attrs);
    this.appendChild(this._submitBlock);
    this.addCancelButton();
    this.addSubmitButton();
  }

  addCancelButton() {
    const attrs: IButtonWithIconAttributes = {
      classList: 'waves-effect waves-light btn-small red lighten-2',
      onClick: () => {},
      icon: 'clear',
    };
    const cancelButton = new ButtonWithIconComponent(attrs);
    this._submitBlock.appendChild(cancelButton);
  }

  addSubmitButton() {
    const attrs: IButtonWithIconAttributes = {
      classList: 'waves-effect waves-light btn-small red lighten-2',
      onClick: () => {
        currentCart.removeCart(this._updateCallback);
      },
      icon: 'done',
    };
    const cancelButton = new ButtonWithIconComponent(attrs);
    this._submitBlock.appendChild(cancelButton);
  }
}
