import { BaseComponent } from './base-component';

export interface ICardAttributes {
  imageSrc?: string;
  title?: string;
  description?: string;
  inputValue?: string;
}

export class CardComponent extends BaseComponent {
  protected card: BaseComponent;

  constructor(data: Partial<ICardAttributes> = {}) {
    const { description = '' } = data;

    super({ tag: 'div', classList: ['col', 's12', 'm4', 'center-align'] });

    const card = new BaseComponent({ tag: 'div', classList: ['card'] });
    this.card = card;
    this.appendChild(this.card);

    const cardContent = new BaseComponent({
      tag: 'div',
      classList: ['card-content'],
    });
    card.appendChild(cardContent);

    const contentParagraph = new BaseComponent({
      tag: 'p',
      content: description,
    });
    cardContent.appendChild(contentParagraph);
  }
}
