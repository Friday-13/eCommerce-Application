import { BaseComponent, IAttributes } from '@components/base-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import { ProductData } from '@models/products';
import { getProductById } from '@services/product-data';
import { showErrorMessage } from '@utils/toast-messages';
import View from '@views/view';
import brendDisney from '@assets/brend/disney.png';

export default class ProductPageView extends View {
  private galleryWrapper!: BaseComponent;

  private productContainer!: BaseComponent;

  private titlesContainer!: BaseComponent;

  private productDescription!: BaseComponent;

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

    this.setupGallerySlider(this.galleryWrapper);
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
    this.initializeProductDescription(this.productContainer);
  }

  private setupGallerySlider(detailsProduct: BaseComponent) {
    const addImages = (imageUrls: string[]) => {
      imageUrls.forEach((url) => {
        const productImageAttrs: IImageAttributes = {
          src: url,
          alt: 'Image-product',
          classList: ['slider-image'],
        };
        const productImage = new ImageComponent(productImageAttrs);
        detailsProduct.appendChild(productImage);
      });
    };

    getProductById(
      this.productId,
      (productData: ProductData) => {
        addImages(productData.imageUrls);
      },
      (errorMsg: string) => {
        showErrorMessage(`Error fetching product details: ${errorMsg}`);
      }
    );
  }

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

    const productCategotyAttrs: IAttributes = {
      classList: ['product-category'],
    };
    const productCategory = new BaseComponent(productCategotyAttrs);

    const productBrendImageAttrs: IImageAttributes = {
      src: brendDisney,
      alt: 'Image-product-brend',
      classList: ['brend-image'],
    };
    const productBrendImage = new ImageComponent(productBrendImageAttrs);

    this.titlesContainer.appendChild(productTitle);
    this.titlesContainer.appendChild(productCategory);
    productCategory.appendChild(productBrendImage);

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

  private initializeProductDescription(detailsProduct: BaseComponent) {
    const productDescriptionAttrs: IAttributes = {
      classList: ['product-description'],
      content: '',
    };
    this.productDescription = new BaseComponent(productDescriptionAttrs);
    detailsProduct.appendChild(this.productDescription);

    getProductById(
      this.productId,
      (productData: ProductData) => {
        this.productDescription.textContent = productData.description;
      },
      (errorMsg: string) => {
        showErrorMessage(`Error fetching product details: ${errorMsg}`);
      }
    );
  }
}
