import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';
import { IImageAttributes, ImageComponent } from '@components/image-component';

export default class ImageSliderProducts extends View {
  private container!: BaseComponent;

  constructor(images: string[]) {
    const attrs: IAttributes = {
      classList: ['swiper'],
    };
    super(attrs);
    this.container = new BaseComponent(attrs);
    this.initializeSlider(images);
  }

  public initializeSlider(images: string[]) {
    this.initializeSliderDetails(images);
    this.initializeSliderNavigation();
    this.initializeSliderPagination();
  }

  private initializeSliderDetails(images: string[]) {
    const detailsSliderAttrs: IAttributes = {
      classList: ['swiper-wrapper'],
    };
    const detailsSlider = new BaseComponent(detailsSliderAttrs);
    this.container.appendChild(detailsSlider);

    images.forEach((imageUrl) => {
      const containerSlideAttrs: IAttributes = {
        classList: ['swiper-slide'],
      };
      const containerSlide = new BaseComponent(containerSlideAttrs);

      const imgSlideAttrs: IImageAttributes = {
        src: imageUrl,
        alt: 'Image-product',
        classList: ['slider-image'],
      };
      const imgSlide = new ImageComponent(imgSlideAttrs);
      containerSlide.appendChild(imgSlide);

      detailsSlider.appendChild(containerSlide);
    });
  }

  private initializeSliderNavigation() {
    const navigationSliderNextAttrs: IAttributes = {
      classList: ['swiper-button-next'],
    };
    const navigationSliderNext = new BaseComponent(navigationSliderNextAttrs);
    this.container.appendChild(navigationSliderNext);

    const navigationSliderPrevAttrs: IAttributes = {
      classList: ['swiper-button-prev'],
    };
    const navigationSliderPrev = new BaseComponent(navigationSliderPrevAttrs);
    this.container.appendChild(navigationSliderPrev);
  }

  private initializeSliderPagination() {
    const paginationSliderAttrs: IAttributes = {
      classList: ['swiper-pagination'],
    };
    const paginationSlider = new BaseComponent(paginationSliderAttrs);
    this.container.appendChild(paginationSlider);
  }

  public get htmlElement() {
    return this.container.node;
  }
}
