import { IAttributes } from '@components/base-component';
import View from '@views/view';
import ProductCardView from './product-card';

export default class ProductListView extends View {
  constructor() {
    const attrs: IAttributes = {
      classList: 'col s12 m10 offset-m1',
    };
    super(attrs);
    this.setProducts();
  }

  setProducts() {
    for (let i = 0; i < 14; i += 1) {
      const card = new ProductCardView();
      this.appendChild(card);
    }
  }
}
