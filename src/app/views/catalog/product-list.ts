import { IAttributes } from '@components/base-component';
import View from '@views/view';
import { IProductData } from '@models/products';
import ProductCardView from './product-card';

export default class ProductListView extends View {
  constructor() {
    const attrs: IAttributes = {};
    super(attrs);
  }

  setProducts(products: Array<IProductData>) {
    products.forEach((product) => {
      const card = new ProductCardView(product);
      this.appendChild(card);
    });
  }
}
