import View from '@views/view';
import { BaseComponent, IAttributes } from '@components/base-component';
import { ICardAttributes } from '@components/card-component';
import getActivePromocodes from '@services/get-active-promocodes';
import { DiscountCode } from '@commercetools/platform-sdk';
import ParallaxView from '@views/parallax-view';
import paralaxImgUrl1 from '@assets/main/haberdoedas-GCb-JayNikc-unsplash.jpg';
import paralaxImgUrl2 from '@assets/main/alan-rodriguez-rUtX6dvmCeM-unsplash.jpg';
import paralaxImgUrl3 from '@assets/main/lego-2383096_1280.jpg';
import DiscountCardComponent from './discount-card';
import MainSectionView from './main-section';

export default class MainPageView extends View {
  private _promoSection = new MainSectionView({});

  constructor() {
    const attrs: IAttributes = {
      classList: ['main-container'],
    };
    super(attrs);
    this.initializeMainContent();
  }

  private initializeMainContent(): void {
    document.body.appendChild(this.htmlElement);

    const parallax1 = new ParallaxView('parallax1', paralaxImgUrl1);
    this.appendChild(parallax1);

    this.addTaglineSection();

    const parallax2 = new ParallaxView('parallax2', paralaxImgUrl2);
    this.appendChild(parallax2);

    this.addPromoSection();

    const parallax3 = new ParallaxView('parallax2', paralaxImgUrl3);
    this.appendChild(parallax3);
  }

  addPromoSection() {
    const promoHeaderAttrs: IAttributes = {
      classList: 'header',
      tag: 'h3',
      content: 'Promocodes',
    };

    this._promoSection = new MainSectionView(promoHeaderAttrs);

    this.appendChild(this._promoSection);
    getActivePromocodes(this.showDiscountCodes.bind(this), () => {});
  }

  addTaglineSection() {
    const headerAttrs: IAttributes = {
      content: 'Bricktopia',
      classList: 'header',
      tag: 'h2',
    };
    const taglineAttrs: IAttributes = {
      content:
        'Let your imagination soar with our colorful bricks and build a world of endless possibilities, one block at a time!',
      tag: 'p',
      classList: 'flow-text',
    };

    const section = new MainSectionView(headerAttrs);
    const tagline = new BaseComponent(taglineAttrs);
    section.content = tagline;

    this.appendChild(section);
  }

  showDiscountCodes(discountCodes: Array<DiscountCode>) {
    this._promoSection.content = new BaseComponent({});
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
      this._promoSection.appendContent(card);
    });
  }
}
