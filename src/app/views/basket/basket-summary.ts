import { BaseComponent, IAttributes } from '@components/base-component';
import {
  ButtonComponent,
  IButtonAttributes,
} from '@components/button-component';
import { InputFieldComponent } from '@components/input-field-component';
import { ICartData, ILineItem } from '@models/cart';
import { IFormInputField, createInputField } from '@utils/create-input-field';
import View from '@views/view';
import applyPromocodeToCart from '@services/apply-promocode-to-cart';
import { showErrorMessage } from '@utils/toast-messages';
import { createCartData } from '@services/cart-data';
import { Cart } from '@commercetools/platform-sdk';
import styles from './basket-summary.module.scss';

interface ISummary {
  totalPrice: number;
  discountedPrice: number;
}

export default class BasketSummaryView extends View {
  protected _card = new View({});

  private cartData?: ICartData | null = null;

  private _totalPriceBlock = new BaseComponent({});

  private _discountedPriceBlock = new BaseComponent({});

  private _promocodeField = new InputFieldComponent({}, {}, {});

  private _applyPromocodeButton = new ButtonComponent({});

  private _summary: ISummary = {
    totalPrice: 0,
    discountedPrice: 0,
  };

  constructor(cartData?: ICartData) {
    const attrs: IAttributes = {
      classList: ['col', 's12', 'm12', 'l4'],
    };
    super(attrs);
    this.cartData = cartData;
    this.addCard();
  }

  addCard() {
    const attrs: IAttributes = {
      classList: ['card', styles.basketSummary],
    };
    this._card = new View(attrs);
    this.appendChild(this._card);
    this.addPromocodeField();
    this.addTotalPriceBlock();
    this.addDiscountedPrice();
    this.updateData();
  }

  addTotalPriceBlock() {
    if (this.cartData) {
      const attrs: IAttributes = {
        classList: styles.basketSummaryPrice,
      };
      this._totalPriceBlock = new BaseComponent(attrs);
      this._card.appendChild(this._totalPriceBlock);
    }
  }

  addPromocodeField() {
    const attrs: IFormInputField = {
      id: 'promocode',
      type: 'text',
      label: 'Promocode',
      required: false,
      placeholder: 'Enter here',
      customValidators: [],
    };

    this._promocodeField = createInputField(attrs);
    this._promocodeField.removeClass('s6');
    this._card.appendChild(this._promocodeField);

    const applyButtonAttrs: IButtonAttributes = {
      classList: 'waves-effect waves-light btn-small red lighten-2',
      content: 'Apply',
      onClick: this.applyPromocode.bind(this),
    };

    this._applyPromocodeButton = new ButtonComponent(applyButtonAttrs);
    this._card.appendChild(this._applyPromocodeButton);
  }

  addDiscountedPrice() {
    if (this.cartData) {
      const attrs: IAttributes = {
        classList: styles.basketSummaryPrice,
      };
      this._discountedPriceBlock = new BaseComponent(attrs);
      this._card.appendChild(this._discountedPriceBlock);
    }
  }

  updateDiscountedPrice() {
    if (this.cartData) {
      if (this._summary.discountedPrice !== this._summary.totalPrice) {
        this._discountedPriceBlock.textContent = `Discounted price: $${this._summary.discountedPrice}`;
        this._totalPriceBlock.addClass(styles.basketSummaryOldPrice);
      } else {
        this._discountedPriceBlock.textContent = '';
      }
    }
  }

  updateTotalPrice() {
    if (this.cartData) {
      this._totalPriceBlock.textContent = `Total price: $${this._summary.totalPrice}`;
    }
  }

  applyPromocode() {
    const promocode = this._promocodeField.getValue();
    if (promocode.length > 0 && this.cartData) {
      applyPromocodeToCart(
        this.cartData.id,
        this.cartData.version,
        promocode,
        this.updateData.bind(this),
        () => {
          showErrorMessage('Wrong promocode');
        }
      );
    }
  }

  updateData(newCart?: Cart) {
    const getTotalPrice = (lineItems: Array<ILineItem>) => {
      const totalPrice =
        lineItems.reduce(
          (sum, currentItem) => sum + currentItem.price.value.centAmount,
          0
        ) / 100;
      return totalPrice;
    };
    if (newCart) {
      this.cartData = createCartData(newCart);
    }
    if (this.cartData) {
      const { lineItems } = this.cartData;
      const totalPrice = getTotalPrice(lineItems);
      const discountedPrice = this.cartData.totalPrice.centAmount / 100;

      if (totalPrice !== this._summary.totalPrice) {
        this._summary.totalPrice = totalPrice;
        this.updateTotalPrice();
      }

      if (
        discountedPrice !== this._summary.discountedPrice &&
        discountedPrice
      ) {
        this._summary.discountedPrice = discountedPrice;
        this.updateDiscountedPrice();
      }
    }
  }
}
