import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
    // eslint-disable-next-line no-new
    new Swiper('.swiper', {
      modules: [Navigation, Pagination],
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

  public get htmlElement() {
    return this.container.node;
  }
}
