import { IAttributes } from '@components/base-component';
import { ICartData } from '@models/cart';
import View from '@views/view';

export default class BasketSummaryView extends View {
  protected _card = new View({});

  private cartData?: ICartData | null = null;

  constructor(cartData: ICartData) {
    const attrs: IAttributes = {
      classList: ['col', 's12', 'm12', 'l4'],
    };
    super(attrs);
    this.addCard();
    this.cartData = cartData;
  }

  addCard() {
    const attrs: IAttributes = {
      classList: ['card'],
      content: 'Im summary and controls block',
    };
    this._card = new View(attrs);
    this.appendChild(this._card);
    this._card.htmlElement.style.setProperty('min-height', '400px');
  }
}
