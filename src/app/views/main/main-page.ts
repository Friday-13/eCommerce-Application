import View from '@views/view';
import { BaseComponent, IAttributes } from '@components/base-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import carUrl from '@assets/main-image.webp';
import { ICardAttributes } from '@components/card-component';
import getActivePromocodes from '@services/get-active-promocodes';
import { DiscountCode } from '@commercetools/platform-sdk';
import DiscountCardComponent from './discount-card';

export default class MainPageView extends View {
  private mainContainer!: BaseComponent; // добавлять разные блоки сюда

  private _promoSection = new BaseComponent({});

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
    this._promoSection = new BaseComponent(promoSectionAttr);
    this.mainContainer.appendChild(this._promoSection);
    getActivePromocodes(this.showDiscountCodes.bind(this), () => {});
  }

  showDiscountCodes(discountCodes: Array<DiscountCode>) {
    discountCodes.forEach((discountCode) => {
      const descriptionField = discountCode.description;
      let description = '';
      if (descriptionField) {
        description = descriptionField['en-GB'];
      }
      const cardAttr: ICardAttributes = {
        inputValue: discountCode.code,
        description,
      };

      const card = new DiscountCardComponent(cardAttr);
      this._promoSection.appendChild(card);
    });
  }
}
