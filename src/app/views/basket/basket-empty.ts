import { BaseComponent, IAttributes } from '@components/base-component';
import {
  ButtonComponent,
  IButtonAttributes,
} from '@components/button-component';
import Router from '@utils/router';
import View from '@views/view';
import styles from './basket-empty.module.scss';

const MESSAGE_TEXT_PARAGRAPS = [
  'Uh-oh! Looks like your LEGO shopping cart is feeling a little lonely right now.',
  'Why not fill it up with some awesome sets and minifigures to bring it back to life?',
  'Start building your dream LEGO collection today!',
];

export default class BasketEmptyView extends View {
  constructor() {
    const attrs: IAttributes = {
      classList: ['card', styles.cartEmpty],
    };
    super(attrs);
    this.addMessageBlock();
    this.addCatalogLink();
  }

  private addMessageBlock() {
    const attrs: IAttributes = {
      tag: 'div',
      classList: styles.cartEmptyMessage,
    };

    const contentBlock = new BaseComponent(attrs);
    MESSAGE_TEXT_PARAGRAPS.forEach((messagePart: string) => {
      const partAttrs: IAttributes = {
        content: messagePart,
        tag: 'p',
        classList: 'flow-text',
      };
      const part = new BaseComponent(partAttrs);
      contentBlock.appendChild(part);
    });
    this.appendChild(contentBlock);
  }

  private addCatalogLink() {
    const attrs: IButtonAttributes = {
      classList: 'waves-effect waves-light btn-small red lighten-2',
      content: 'Go to catalog',
      onClick: () => {
        Router.navigateTo('#catalog');
      },
    };
    const button = new ButtonComponent(attrs);
    this.appendChild(button);
  }
}
