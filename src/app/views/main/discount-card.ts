import { BaseComponent } from '@components/base-component';
import {
  ButtonComponent,
  IButtonAttributes,
} from '@components/button-component';
import { CardComponent, ICardAttributes } from '@components/card-component';
import { IInputAttributes, InputComponent } from '@components/input-component';
import { showErrorMessage, showSucessMessage } from '@utils/toast-messages';

export default class DiscountCardComponent extends CardComponent {
  constructor(data: Partial<ICardAttributes> = {}) {
    super(data);
    const { inputValue = '' } = data;
    const discountContainer = new BaseComponent({
      tag: 'div',
    });
    this.card.appendChild(discountContainer);

    const inputAttr: IInputAttributes = {
      disabled: true,
      value: inputValue,
      classList: ['col', 's4', 'red-text', 'offset-s2'],
      id: 'input',
    };

    const input = new InputComponent(inputAttr);
    discountContainer.appendChild(input);

    const buttonAttr: IButtonAttributes = {
      content: 'Copy',
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
