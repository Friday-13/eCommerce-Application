import { BaseComponent, IAttributes } from '@components/base-component';
import { ProductData } from '@models/products';
import { getProductById } from '@services/product-data';
import { showErrorMessage } from '@utils/toast-messages';
import View from '@views/view';

export default class ProductPageView extends View {
  private galleryWrapper!: BaseComponent;

  private productContainer!: BaseComponent;

  private titlesContainer!: BaseComponent;

  private productId: string;

  constructor(productId: string) {
    const attrs: IAttributes = {
      classList: ['main-container-product'],
    };
    super(attrs);
    this.productId = productId;
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

    this.initializeProductTitle(this.productContainer);
  }

  // private setupGallerySlider(detailsProduct: BaseComponent) {}

  // private setupAdditionalDivs(parentComponent: BaseComponent) {
  // Создание дополнительных divs
  // }

  private initializeProductTitle(detailsProduct: BaseComponent) {
    const titlesAttrs: IAttributes = {
      classList: ['product-titles'],
    };
    this.titlesContainer = new BaseComponent(titlesAttrs);

    const productTitleAttrs: IAttributes = {
      tag: 'h1',
      classList: ['product-title'],
      content: '',
    };
    const productTitle = new BaseComponent(productTitleAttrs);
    this.titlesContainer.appendChild(productTitle);

    const productCategotyAttrs: IAttributes = {
      classList: ['product-category'],
    };
    const productCategory = new BaseComponent(productCategotyAttrs);
    this.titlesContainer.appendChild(productCategory);

    this.titlesContainer.appendChild(productTitle);
    this.titlesContainer.appendChild(productCategory);

    getProductById(
      this.productId,
      (productData: ProductData) => {
        productTitle.textContent = productData.productName;
      },
      (errorMsg: string) => {
        showErrorMessage(`Error fetching product details: ${errorMsg}`);
      }
    );

    detailsProduct.appendChild(this.titlesContainer);
  }
}
