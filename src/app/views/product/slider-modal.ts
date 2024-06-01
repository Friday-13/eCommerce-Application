import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { IButtonAttributes } from '@components/button-component';

export default class ModalImageSliderProducts extends View {
  private containerModal!: BaseComponent;

  private containerSlideModal!: BaseComponent;

  private initialIndex!: number;

  constructor(images: string[], initialIndex: number) {
    const attrs: IAttributes = {
      classList: ['swiper swiper-modal'],
    };
    super(attrs);
    console.log('Modal slider initialized with index:', initialIndex); // Для отладки
    this.containerModal = new BaseComponent(attrs);
    this.initialIndex = initialIndex;
    this.initializeSliderModal(images);
  }

  public initializeSliderModal(images: string[]) {
    this.initializeSliderDetailsModal(images);
    this.initializeSliderNavigationModal();
    this.initializeSliderPaginationModal();
    this.initializeSliderCloseModal();
  }

  private initializeSliderDetailsModal(images: string[]) {
    const detailsSliderAttrs: IAttributes = {
      classList: ['swiper-wrapper wrapper-modal'],
    };
    const detailsSliderModal = new BaseComponent(detailsSliderAttrs);
    this.containerModal.appendChild(detailsSliderModal);

    images.forEach((imageUrl) => {
      const containerSlideAttrs: IAttributes = {
        classList: ['swiper-slide slide-modal'],
      };
      this.containerSlideModal = new BaseComponent(containerSlideAttrs);

      const imgSlideAttrs: IImageAttributes = {
        src: imageUrl,
        alt: 'Image-product',
        classList: ['slider-image'],
      };
      const imgSlide = new ImageComponent(imgSlideAttrs);
      this.containerSlideModal.appendChild(imgSlide);

      detailsSliderModal.appendChild(this.containerSlideModal);
    });
  }

  private initializeSliderNavigationModal() {
    const navigationSliderNextAttrs: IAttributes = {
      classList: ['swiper-button-next next-modal'],
    };
    const navigationSliderModalNext = new BaseComponent(
      navigationSliderNextAttrs
    );
    this.containerModal.appendChild(navigationSliderModalNext);

    const navigationSliderPrevAttrs: IAttributes = {
      classList: ['swiper-button-prev prev-modal'],
    };
    const navigationSliderModalPrev = new BaseComponent(
      navigationSliderPrevAttrs
    );
    this.containerModal.appendChild(navigationSliderModalPrev);
  }

  private initializeSliderPaginationModal() {
    const paginationSliderAttrs: IAttributes = {
      classList: ['swiper-pagination pagination-modal'],
    };
    const paginationSliderModal = new BaseComponent(paginationSliderAttrs);
    this.containerModal.appendChild(paginationSliderModal);
  }

  private initializeSliderCloseModal() {
    const closeButtonAttrs: IButtonAttributes = {
      classList: ['button-close-modal'],
      content: 'x',
    };
    const closeButton = new BaseComponent(closeButtonAttrs);
    this.containerModal.appendChild(closeButton);

    closeButton.node.addEventListener('click', (event) => {
      event.preventDefault();
      this.close();
      document.body.removeChild(this.htmlElement);
    });
    this.containerModal.node.addEventListener('click', (event) => {
      const target = event.target as Node;
      if (target && !this.containerSlideModal.node.contains(target)) {
        // this.close();
      }
    });
  }

  public open() {
    this.containerModal.node.classList.add('popup-open');
    setTimeout(() => {
      this.initializeSwiper();
    }, 0);
  }

  // eslint-disable-next-line class-methods-use-this
  private initializeSwiper() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const swiper = new Swiper('.swiper', {
      initialSlide: this.initialIndex,
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

  public close() {
    this.containerModal.node.classList.remove('popup-open');
  }

  public get htmlElement() {
    return this.containerModal.node;
  }
}
