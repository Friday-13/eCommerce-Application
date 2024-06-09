import { BaseComponent, IAttributes } from '@components/base-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import { IProductData } from '@models/products';
import { getProductById } from '@services/product-data';
import { showErrorMessage } from '@utils/toast-messages';
import View from '@views/view';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Theme, themeToBrandImageMap } from '@models/brend-images';
import ImageSliderProducts from './slider';
import ModalImageSliderProducts from './slider-modal';

export default class ProductPageView extends View {
  private galleryWrapper!: BaseComponent;

  private productContainer!: BaseComponent;

  private titlesContainer!: BaseComponent;

  private productDescriptionContainer!: BaseComponent;

  private productDescription!: BaseComponent;

  private pricesContainer!: BaseComponent;

  private productId: string;

  private currentImageUrls: string[] = [];

  private productData?: IProductData;

  constructor(productId: string) {
    const attrs: IAttributes = {
      classList: ['main-container-product'],
    };
    super(attrs);
    this.productId = productId;
    this.fetchProductData(() => {
      this.initializeContentProductPage();
    });
  }

  public initializeContentProductPage() {
    this.initializeDetailsProduct();
  }

  private fetchProductData(callback: () => void): void {
    getProductById(
      this.productId,
      (productData: IProductData) => {
        this.productData = productData;
        callback();
      },
      (errorMsg: string) => {
        showErrorMessage(`Error fetching product details: ${errorMsg}`);
      }
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public initializeSwiper() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      slidesPerView: 'auto',
      watchOverflow: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
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
    this.initializeProductDescription(detailsProduct);
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
    this.initializeProductPrice(this.productContainer);
  }

  private onImageClick(imageUrl: string) {
    this.modalOpen(imageUrl);
  }

  private modalOpen(imageUrl: string) {
    const initialIndex = this.currentImageUrls.indexOf(imageUrl);
    // console.log('Opening modal for URL:', imageUrl, 'at index:', initialIndex);
    if (initialIndex === -1) {
      return;
    }
    const modalSlider = new ModalImageSliderProducts(
      this.currentImageUrls,
      initialIndex
    );
    document.body.appendChild(modalSlider.htmlElement);
    modalSlider.open();
    document.body.classList.add('lock');
  }

  private setupGallerySlider(detailsProduct: BaseComponent) {
    if (!this.productData) return;

    const addImagesToSlider = (imageUrls: string[]) => {
      this.currentImageUrls = imageUrls;
      const imageSlider = new ImageSliderProducts(
        imageUrls,
        this.modalOpen.bind(this)
      );
      detailsProduct.node.appendChild(imageSlider.htmlElement);
      setTimeout(() => {
        this.initializeSwiper();
      }, 0);
    };

    addImagesToSlider(this.productData.imageUrls);
  }

  // private setupAdditionalDivs(parentComponent: BaseComponent) {
  // Создание дополнительных divs
  // }

  private initializeProductTitle(detailsProduct: BaseComponent) {
    if (!this.productData) return;

    const titlesAttrs: IAttributes = {
      classList: ['product-titles'],
    };
    this.titlesContainer = new BaseComponent(titlesAttrs);

    const productTitleAttrs: IAttributes = {
      tag: 'h1',
      classList: ['product-title'],
      content: this.productData.productName,
    };
    const productTitle = new BaseComponent(productTitleAttrs);

    const productCategotyAttrs: IAttributes = {
      classList: ['product-category'],
    };
    const productCategory = new BaseComponent(productCategotyAttrs);

    const productBrendImageAttrs: IImageAttributes = {
      src: '',
      alt: 'Image-product-brend',
      classList: ['brend-image'],
    };
    const productBrendImage = new ImageComponent(productBrendImageAttrs);

    this.titlesContainer.appendChild(productTitle);
    this.titlesContainer.appendChild(productCategory);
    productCategory.appendChild(productBrendImage);

    const brandImageSrc = themeToBrandImageMap[this.productData.theme as Theme];
    if (brandImageSrc) {
      productBrendImage.node.src = brandImageSrc;
      productBrendImage.node.alt = `Image of ${this.productData.theme} brand`;
    }

    detailsProduct.appendChild(this.titlesContainer);
  }

  private initializeProductPrice(detailsProduct: BaseComponent) {
    if (!this.productData) return;

    const pricesProductAttrs: IAttributes = {
      classList: ['product-prices'],
    };
    this.pricesContainer = new BaseComponent(pricesProductAttrs);

    const productPriceAttrs: IAttributes = {
      classList: ['product-price'],
      content: `$ ${this.productData.price}`,
    };
    const productPrice = new BaseComponent(productPriceAttrs);
    this.pricesContainer.appendChild(productPrice);

    // Добавляем цену со скидкой только если она есть
    if (this.productData.discountedPrice) {
      const productDiscountPriceAttrs: IAttributes = {
        classList: ['product-price-discount'],
        content: `$ ${this.productData.discountedPrice}`,
      };
      const productDiscountPrice = new BaseComponent(productDiscountPriceAttrs);
      this.pricesContainer.appendChild(productDiscountPrice);
      productPrice.addClass('price-strikethrough');
    }

    detailsProduct.appendChild(this.pricesContainer);
  }

  private initializeProductDescription(detailsProduct: BaseComponent) {
    if (!this.productData) return;

    const productDescriptionContainerAttrs: IAttributes = {
      tag: 'section',
      classList: ['product-description-container'],
      content: '',
    };
    this.productDescriptionContainer = new BaseComponent(
      productDescriptionContainerAttrs
    );
    detailsProduct.appendChild(this.productDescriptionContainer);

    const productDescriptionAttrs: IAttributes = {
      classList: ['product-description'],
      content: '',
    };
    this.productDescription = new BaseComponent(productDescriptionAttrs);
    this.productDescriptionContainer.appendChild(this.productDescription);
    this.productDescription.node.innerHTML = this.productData.description;
  }
}
