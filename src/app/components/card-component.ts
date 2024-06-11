import { showErrorMessage, showSucessMessage } from '@utils/toast-messages';
import { BaseComponent, IAttributes } from './base-component';
import { ButtonComponent, IButtonAttributes } from './button-component';
import { IImageAttributes, ImageComponent } from './image-component';
import { IInputAttributes, InputComponent } from './input-component';

export interface ICardAttributes {
  imageSrc?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  inputValue?: string;
  buttonClickHandler?: () => void;
}

export class CardComponent extends BaseComponent {
  constructor(data: Partial<ICardAttributes> = {}) {
    const { imageSrc = '', title = '', description = '', inputValue = ''  } = data;

    super({ tag: 'div', classList: ['col', 's12', 'm4'] });

    const card = new BaseComponent({ tag: 'div', classList: ['card'] });
    this.appendChild(card);

    const cardImage = new BaseComponent({
      tag: 'div',
      classList: ['card-image'],
    });
    card.appendChild(cardImage);

    if (imageSrc !== '') {
      const imgAttr: IImageAttributes = {
        alt: 'img',
        src: imageSrc,
      };
      const img = new ImageComponent(imgAttr);
      cardImage.appendChild(img);
    }

    if (title !== '') {
      const titleSpan = new BaseComponent({
        tag: 'span',
        classList: ['card-title'],
        content: title,
      });
      cardImage.appendChild(titleSpan);
    }

    if (description !== '') {
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
    const discountContainerAttr: IAttributes = {
      tag: 'div',
      classList: ['row'],
    };
    const discountContainer = new BaseComponent(discountContainerAttr);
    card.appendChild(discountContainer);

    const inputAttr: IInputAttributes = {
      disabled: true,
      value: inputValue,
      classList: ['col s3 red-text offset-s2'],
      id: 'input',
    };
    const input = new InputComponent(inputAttr);
    discountContainer.appendChild(input);

    const buttonAttr: IButtonAttributes = {
      content: 'COPY',
      onClick: () => {
        const inputElement = document.getElementById(
          'input'
        ) as HTMLInputElement;
        if (inputElement) {
          navigator.clipboard
            .writeText(inputElement.value)
            .then(() => {
              showSucessMessage('Text copied to clipboard');
            })
            .catch(() => {
              showErrorMessage('Failed to copy text');
            });
        }
      },
      classList: [
        'edit-profile-button',
        'profile-button',
        'waves-effect',
        'waves-light',
        'btn',
        'no-text-transform',
      ],
    };
    const button = new ButtonComponent(buttonAttr);
    discountContainer.appendChild(button);
  }
}
