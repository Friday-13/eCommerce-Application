import {
  AnchorWithIconComponent,
  IAnchorWithIconAttributes,
} from '@components/anchor-with-icon';
import { BaseComponent, IAttributes } from '@components/base-component';
import { CardComponent, ICardAttributes } from '@components/card-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';

export default class AboutUsCardComponent extends CardComponent {
  constructor(data: Partial<ICardAttributes> = {}) {
    const { imageSrc = '', title = '', bio = '', href = '#' } = data;

    super(data);

    const cardImage = new BaseComponent({
      tag: 'div',
      classList: ['card-image', 'standard-size'],
    });
    this.card.appendChild(cardImage);

    const imageAttrs: IImageAttributes = {
      src: imageSrc,
      alt: '',
    };
    const image = new ImageComponent(imageAttrs);
    cardImage.appendChild(image);

    if (title) {
      const titleSpan = new BaseComponent({
        tag: 'span',
        classList: ['card-title'],
        content: title,
      });
      cardImage.appendChild(titleSpan);
    }

    const aboutMeAttr: IAttributes = {
      content: bio,
      classList: ['card-content'],
    };
    const aboutMe = new BaseComponent(aboutMeAttr);
    this.card.appendChild(aboutMe);

    const cardAction = new BaseComponent({
      tag: 'div',
      classList: ['card-action', 'github-link'],
    });
    this.card.appendChild(cardAction);

    const anchorAttrs: IAnchorWithIconAttributes = {
      content: 'GitHub Profile',
      icon: 'github',
      href,
    };
    const link = new AnchorWithIconComponent(anchorAttrs);
    cardAction.appendChild(link);
  }
}
