import { BaseComponent, IAttributes } from '@components/base-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import View from '@views/view';

export default class BasketProductView extends View {
  private imageContainerCart!: BaseComponent;

  constructor() {
    const attrs: IAttributes = {
      tag: 'article',
      classList: 'card',
    };
    super(attrs);
    this.initializeContentProductBlockInCart();
  }

  // добавляем то, что в корзине
  public initializeContentProductBlockInCart() {
    this.initializeDetailsProductCart();
  }

  // общий блок картички в корзине
  private initializeDetailsProductCart() {
    const detailsAttrs: IAttributes = {
      classList: ['card-conntainer'],
    };
    const detailsProductCart = new BaseComponent(detailsAttrs);
    this.appendChild(detailsProductCart);

    this.initializeProductImageCart(detailsProductCart);
    // this.initializeProductContent(detailsProductCart);
  }

  private initializeProductImageCart(detailsProductCart: BaseComponent) {
    // if (!this.productData) return;

    const imageContainerCartAttrs: IAttributes = {
      classList: ['cart-image'],
    };
    this.imageContainerCart = new BaseComponent(imageContainerCartAttrs);

    const imageProductCartAttrs: IImageAttributes = {
      src: '',
      alt: 'Image-product',
      classList: ['cart-img'],
    };
    const imageProductCart = new ImageComponent(imageProductCartAttrs);

    this.imageContainerCart.appendChild(imageProductCart);
    detailsProductCart.appendChild(this.imageContainerCart);
  }
}
