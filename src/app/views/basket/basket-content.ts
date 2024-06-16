import { IAttributes } from '@components/base-component';
import View from '@views/view';
import { ICartData } from '@models/cart';
import BasketProductView from './basket-product';

export default class BasketContentView extends View {
  private cartData?: ICartData | null = null;

  constructor(cartData: ICartData) {
    const attrs: IAttributes = {
      classList: ['col', 's12', 'm12', 'l8'],
    };
    super(attrs);
    this.addProducts();
    this.cartData = cartData;
  }

  addProducts() {
    for (let i = 0; i < 10; i += 1) {
      if (!this.cartData) return;
      const product = new BasketProductView(this.cartData);
      product.htmlElement.style.setProperty('min-height', '100px');
      this.appendChild(product);
    }
  }
}
