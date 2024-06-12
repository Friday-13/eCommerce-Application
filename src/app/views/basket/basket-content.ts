import { IAttributes } from '@components/base-component';
import View from '@views/view';
import BasketProductView from './basket-product';

export default class BasketContentView extends View {
  constructor() {
    const attrs: IAttributes = {
      classList: ['col', 's12', 'm12', 'l8'],
    };
    super(attrs);
    this.addProducts();
  }

  addProducts() {
    for (let i = 0; i < 10; i += 1) {
      const product = new BasketProductView();
      product.htmlElement.style.setProperty('min-height', '100px');
      this.appendChild(product);
    }
  }
}
