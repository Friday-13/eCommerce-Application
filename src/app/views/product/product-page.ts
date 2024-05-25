import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';

export default class ProductPageView extends View {
  // private detailsProduct: BaseComponent;

  private galleryWrapper!: BaseComponent;

  private productContainer!: BaseComponent;

  constructor() {
    const attrs: IAttributes = {
      classList: ['main-container'],
    };
    super(attrs);
    this.initializeContentProductPage();
  }

  public initializeContentProductPage() {
    this.initializeDetailsProduct();
  }

  private initializeDetailsProduct() {
    const detailsAttrs: IAttributes = {
      tag: 'article',
      classList: ['product-details'],
    };
    const detailsProduct = new BaseComponent(detailsAttrs);
    this.appendChild(detailsProduct);

    this.initializeGalleryWrapper(detailsProduct);
    this.initializeProductContainer(detailsProduct);
  }

  // Секция для картинок и слайдера
  private initializeGalleryWrapper(detailsProduct: BaseComponent) {
    const galleryAttrs: IAttributes = {
      tag: 'section',
      classList: ['gallery-wrapper'],
    };
    this.galleryWrapper = new BaseComponent(galleryAttrs);
    detailsProduct.appendChild(this.galleryWrapper);

    // this.setupGallerySlider(galleryWrapper);
    // this.setupAdditionalDivs(galleryWrapper);
  }

  // Секция для названия количества цены и др
  private initializeProductContainer(detailsProduct: BaseComponent) {
    const productContainerAttrs: IAttributes = {
      tag: 'section',
      classList: ['product-container'],
    };
    this.productContainer = new BaseComponent(productContainerAttrs);
    detailsProduct.appendChild(this.productContainer);
  }

  // private setupGallerySlider(parentComponent: BaseComponent) {
  // Создание и конфигурация слайдера
  // }

  // private setupAdditionalDivs(parentComponent: BaseComponent) {
  // Создание дополнительных divs
  // }
}
