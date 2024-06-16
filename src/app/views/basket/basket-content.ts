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
    this.cartData = cartData;
    this.addProducts();
  }

  addProducts() {
    if (!this.cartData || !this.cartData.lineItems) {
      return;
    }
    const numberOfProducts = Math.min(10, this.cartData.lineItems.length);

    for (let i = 0; i < numberOfProducts; i += 1) {
      // Создаём объект, содержащий ссылку на общие данные корзины и данные конкретного товара
      const productCartData = {
        cartData: this.cartData, // Полные данные корзины
        lineItem: this.cartData.lineItems[i], // Данные конкретного товара
      };
      const product = new BasketProductView(productCartData);
      product.htmlElement.style.setProperty('min-height', '100px');
      this.appendChild(product);
    }
  }
}
