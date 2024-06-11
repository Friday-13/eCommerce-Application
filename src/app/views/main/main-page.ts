import View from '@views/view';
import { BaseComponent, IAttributes } from '@components/base-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import carUrl from '@assets/main-image.webp';
import { CardComponent, ICardAttributes } from '@components/card-component';

export default class MainPageView extends View {
  private mainContainer!: BaseComponent; // добавлять разные блоки сюда

  constructor() {
    const attrs: IAttributes = {};
    super(attrs);
    this.initializeMainContent();
  }

  private initializeMainContent(): void {
    const mainContainerAttrs: IAttributes = {
      classList: ['main-container'],
    };
    this.mainContainer = new BaseComponent(mainContainerAttrs);

    const mainImgAttrs: IImageAttributes = {
      src: carUrl,
      alt: 'Car',
      classList: ['main-image', 'responsive-img'],
    };
    const mainImg = new ImageComponent(mainImgAttrs);

    this.mainContainer.appendChild(mainImg);
    this.appendChild(this.mainContainer);
    document.body.appendChild(this.htmlElement);

    const promoSectionAttr: IAttributes = {
      tag: 'section',
      id: 'promo-section',
      classList: ['row'],
    };
    const promoSection = new BaseComponent(promoSectionAttr);
    this.mainContainer.appendChild(promoSection);

    const discountContainer: IAttributes = {
      tag: 'div',
      classList: ['row', 'center-align'],
    };

    const cardAttr1: ICardAttributes = {
      inputValue: 'DISCOUNT10',
      description: 'GET 30% OFF YOUR CART WITH ORDERS OVER 1000$',
    };
    const card1 = new CardComponent(cardAttr1, discountContainer);
    promoSection.appendChild(card1);

    const cardAttr2: ICardAttributes = {
      inputValue: 'DISCOUNT20',
      description: 'TAKE AN EXTRA 20% OFF FOR ORDERS OVER 1000€',
    };
    const card2 = new CardComponent(cardAttr2, discountContainer);
    promoSection.appendChild(card2);

    const cardAttr3: ICardAttributes = {
      inputValue: 'DISCOUNT30',
      description: 'GET 30% OFF YOUR CART WITH ORDERS OVER 1500$',
    };
    const card3 = new CardComponent(cardAttr3, discountContainer);
    promoSection.appendChild(card3);
  }
}
