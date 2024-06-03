import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { IButtonAttributes } from '@components/button-component';

export default class ModalImageSliderProducts extends View {
  private containerModal!: BaseComponent; // основной для оболочки

  private swiperSliderModal!: BaseComponent; // для класса swiper

  private containerSlideModal!: BaseComponent;

  private detailsSliderModal!: BaseComponent;

  private initialIndex!: number;

  constructor(images: string[], initialIndex: number) {
    const attrs: IAttributes = {
      classList: ['swiper-modal-container'],
    };
    super(attrs);
    console.log('Modal slider initialized with index:', initialIndex); // Для отладки
    this.containerModal = new BaseComponent(attrs);
    this.initialIndex = initialIndex;
    this.initializeSliderModal(images);
  }

  public initializeSliderModal(images: string[]) {
    this.initializeSliderDetailsModal(images);
    this.initializeSliderCloseModal();
    this.initializeSliderNavigationModal();
    this.initializeSliderPaginationModal();
  }

  private initializeSliderDetailsModal(images: string[]) {
    const swiperSliderAttrs: IAttributes = {
      classList: ['swiper', 'swiper-modal'],
    };
    this.swiperSliderModal = new BaseComponent(swiperSliderAttrs);
    this.containerModal.appendChild(this.swiperSliderModal); // убрали в контейнер swiper

    const detailsSliderAttrs: IAttributes = {
      classList: ['swiper-wrapper', 'wrapper-modal'],
    };
    this.detailsSliderModal = new BaseComponent(detailsSliderAttrs);
    this.swiperSliderModal.appendChild(this.detailsSliderModal); // убрали в swiper детали

    images.forEach((imageUrl) => {
      const containerSlideAttrs: IAttributes = {
        classList: ['swiper-slide', 'slide-modal'],
      };
      this.containerSlideModal = new BaseComponent(containerSlideAttrs);

      const imgSlideAttrs: IImageAttributes = {
        src: imageUrl,
        alt: 'Image-product',
        classList: ['slider-image'],
      };
      const imgSlide = new ImageComponent(imgSlideAttrs);
      this.containerSlideModal.appendChild(imgSlide);

      this.detailsSliderModal.appendChild(this.containerSlideModal);
    });
  }

  private initializeSliderNavigationModal() {
    const navigationSliderNextAttrs: IAttributes = {
      classList: ['swiper-button-next', 'next-modal'],
    };
    const navigationSliderModalNext = new BaseComponent(
      navigationSliderNextAttrs
    );
    this.swiperSliderModal.appendChild(navigationSliderModalNext);

    const navigationSliderPrevAttrs: IAttributes = {
      classList: ['swiper-button-prev', 'prev-modal'],
    };
    const navigationSliderModalPrev = new BaseComponent(
      navigationSliderPrevAttrs
    );
    this.swiperSliderModal.appendChild(navigationSliderModalPrev);
  }

  private initializeSliderPaginationModal() {
    const paginationSliderAttrs: IAttributes = {
      classList: ['swiper-pagination', 'pagination-modal'],
    };
    const paginationSliderModal = new BaseComponent(paginationSliderAttrs);
    this.swiperSliderModal.appendChild(paginationSliderModal);
  }

  private initializeSliderCloseModal() {
    const closeButtonAttrs: IButtonAttributes = {
      classList: ['button-close-modal'],
      content: 'x',
    };
    const closeButton = new BaseComponent(closeButtonAttrs);
    this.swiperSliderModal.appendChild(closeButton);

    closeButton.node.addEventListener('click', (event) => {
      event.preventDefault();
      this.close();
      document.body.removeChild(this.htmlElement);
    });
    this.swiperSliderModal.node.addEventListener('click', (event) => {
      console.log('Event triggered', event.target);
      const target = event.target as HTMLElement;
      if (
        !target.closest('.swiper-modal .slider-image') &&
        !target.closest('.swiper-modal .swiper-button-next') &&
        !target.closest(
          '.swiper-modal .swiper-button-next .swiper-button-disabled'
        ) &&
        !target.closest('.swiper-modal .swiper-button-prev') &&
        !target.closest(
          '.swiper-modal .swiper-button-prev .swiper-button-disabled'
        ) &&
        !target.closest('.swiper-modal .swiper-pagination')
      ) {
        this.close();
        document.body.classList.remove('lock');
        document.body.removeChild(this.htmlElement);
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
