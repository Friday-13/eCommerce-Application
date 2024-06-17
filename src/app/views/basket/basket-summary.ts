import { BaseComponent, IAttributes } from '@components/base-component';
import { ICartData } from '@models/cart';
import View from '@views/view';

export default class BasketSummaryView extends View {
  protected _card = new View({});

  private cartData?: ICartData | null = null;

  private _totalPriceBlock = new BaseComponent({});

  constructor(cartData: ICartData) {
    const attrs: IAttributes = {
      classList: ['col', 's12', 'm12', 'l4'],
    };
    super(attrs);
    this.cartData = cartData;
    this.addCard();
  }

  addCard() {
    const attrs: IAttributes = {
      classList: ['card'],
    };
    this._card = new View(attrs);
    this.appendChild(this._card);
    this.addTotalPriceBlock();
  }

  addTotalPriceBlock() {
    if (this.cartData) {
      const totalPrice = this.cartData.totalPrice.centAmount / 100;
      const attrs: IAttributes = {
        content: `Total price: $${totalPrice}`,
      };
      this._totalPriceBlock = new BaseComponent(attrs);
      this._card.appendChild(this._totalPriceBlock);
    }
  }

  updateData() {
    if (this.cartData) {
      const totalPrice = this.cartData.totalPrice.centAmount / 100;
      this._totalPriceBlock.textContent = `Total price: $${totalPrice}`;
    }
  }
}
