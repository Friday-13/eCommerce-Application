import { IAttributes } from '@components/base-component';
import View from '@views/view';
import currentCart from '@services/current-cart';
import BasketProductView from './basket-product';
import BasketEmptyView from './basket-empty';

export default class BasketContentView extends View {
  private _updateCallback?: () => void;

  private _products: Array<BasketProductView> = [];

  constructor() {
    const attrs: IAttributes = {
      classList: ['col', 's12', 'm12', 'l8'],
    };
    super(attrs);
    if (currentCart.cartData.lineItems.length !== 0) {
      this.addProducts();
    } else {
      this.addEmptyCartMessage();
    }
  }

  set updateCallback(updateCallback: () => void) {
    this._updateCallback = updateCallback;
    this._products.forEach((product) => {
      product.setUpdateCallback(updateCallback);
    });
  }

  addProducts() {
    const numberOfProducts = Math.min(
      10,
      currentCart.cartData.lineItems.length
    );

    for (let i = 0; i < numberOfProducts; i += 1) {
      // Создаём объект, содержащий ссылку на общие данные корзины и данные конкретного товара
      const productCartData = {
        cartData: currentCart.cartData, // Полные данные корзины
        lineItem: currentCart.cartData.lineItems[i], // Данные конкретного товара
      };
      const product = new BasketProductView(
        productCartData,
        this._updateCallback
      );
      product.htmlElement.style.setProperty('min-height', '100px');
      this._products.push(product);
      this.appendChild(product);
    }
  }

  addEmptyCartMessage() {
    const emptyMessage = new BasketEmptyView();
    this.appendChild(emptyMessage);
  }
}
