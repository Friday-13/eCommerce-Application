import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';
import { IImageAttributes, ImageComponent } from '@components/image-component';

export default class ImageSliderProducts extends View {
  private container!: BaseComponent;

  private swiperSlider!: BaseComponent;

  constructor(
    images: string[],
    private onImageClick: (imageUrl: string) => void
  ) {
    const attrs: IAttributes = {
      classList: ['swiper-container'],
    };
    super(attrs);
    this.container = new BaseComponent(attrs);
    this.initializeSlider(images);
  }

  public initializeSlider(images: string[]) {
    this.initializeSliderDetails(images);
    this.initializeSliderNavigation();
  }

  private initializeSliderDetails(images: string[]) {
    const swiperSliderAttrs: IAttributes = {
      classList: ['swiper', 'swiper-product'],
    };
    this.swiperSlider = new BaseComponent(swiperSliderAttrs);
    this.container.appendChild(this.swiperSlider);

    const detailsSliderAttrs: IAttributes = {
      classList: ['swiper-wrapper'],
    };
    const detailsSlider = new BaseComponent(detailsSliderAttrs);
    this.swiperSlider.appendChild(detailsSlider);

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

      imgSlide.node.addEventListener('click', () =>
        this.onImageClick(imageUrl)
      );

      detailsSlider.appendChild(containerSlide);
    });
  }

  private initializeSliderNavigation() {
    const navigationSliderNextAttrs: IAttributes = {
      classList: ['swiper-button-next'],
    };
    const navigationSliderNext = new BaseComponent(navigationSliderNextAttrs);
    this.swiperSlider.appendChild(navigationSliderNext);

    const navigationSliderPrevAttrs: IAttributes = {
      classList: ['swiper-button-prev'],
    };
    const navigationSliderPrev = new BaseComponent(navigationSliderPrevAttrs);
    this.swiperSlider.appendChild(navigationSliderPrev);
  }

  public get htmlElement() {
    return this.container.node;
  }
}
