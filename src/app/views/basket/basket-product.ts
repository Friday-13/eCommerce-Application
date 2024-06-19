import { BaseComponent, IAttributes } from '@components/base-component';
import { IButtonAttributes } from '@components/button-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import { ICartData, ILineItem } from '@models/cart';
import currentCart from '@services/current-cart';
import View from '@views/view';

interface IProductCartData {
  cartData: ICartData;
  lineItem: ILineItem;
}

export default class BasketProductView extends View {
  private imageContainerCart!: BaseComponent;

  private contentContainerCart!: BaseComponent;

  private pricesContainer!: BaseComponent;

  private iconDeleteCart!: BaseComponent;

  private productCartData?: IProductCartData | null = null;

  private _updateCallback?: () => void;

  constructor(productCartData: IProductCartData, updateCallback?: () => void) {
    const attrs: IAttributes = {
      tag: 'article',
      classList: 'card',
    };
    super(attrs);
    this.productCartData = productCartData;
    if (updateCallback) {
      this.setUpdateCallback = updateCallback;
    }
    this.initializeContentProductBlockInCart();
  }

  setUpdateCallback(updateCallback: () => void) {
    this._updateCallback = updateCallback;
  }

  // добавляем то, что в корзине
  public initializeContentProductBlockInCart() {
    this.initializeDetailsProductCart();
  }

  // общий блок картoчки в корзине
  private initializeDetailsProductCart() {
    const detailsAttrs: IAttributes = {
      classList: ['card-container'],
    };
    const detailsProductCart = new BaseComponent(detailsAttrs);
    this.appendChild(detailsProductCart);

    this.initializeProductImageCart(detailsProductCart);
    this.initializeProductContentCart(detailsProductCart);
  }

  // блок с картинкой
  private initializeProductImageCart(detailsProductCart: BaseComponent) {
    if (!this.productCartData) return;

    const imageContainerCartAttrs: IAttributes = {
      classList: ['cart-image'],
    };
    this.imageContainerCart = new BaseComponent(imageContainerCartAttrs);

    const firstImageUrl = this.productCartData.lineItem.variant.images[0].url;
    const imageProductCartAttrs: IImageAttributes = {
      src: firstImageUrl,
      alt: 'Image-product',
      classList: ['cart-img'],
    };
    const imageProductCart = new ImageComponent(imageProductCartAttrs);

    this.imageContainerCart.appendChild(imageProductCart);
    detailsProductCart.appendChild(this.imageContainerCart);
  }

  // блок с контентом
  private initializeProductContentCart(detailsProductCart: BaseComponent) {
    if (!this.productCartData) return;

    const contentContainerCartAttrs: IAttributes = {
      classList: ['cart-content'],
    };
    this.contentContainerCart = new BaseComponent(contentContainerCartAttrs);

    // блок для наименования и удалить
    const contentTextCartAttrs: IAttributes = {
      classList: ['cart-text'],
    };
    const contentTextCart = new BaseComponent(contentTextCartAttrs);

    // блок для наименования и удалить => внутри 2 блока
    const itemName = this.productCartData.lineItem.name;
    const contentTitleCartAttrs: IAttributes = {
      classList: ['cart-title'],
      content: itemName,
    };
    const contentTitleCart = new BaseComponent(contentTitleCartAttrs);

    const contentDeleteCartAttrs: IAttributes = {
      classList: ['cart-delete'],
    };
    const contentDeleteCart = new BaseComponent(contentDeleteCartAttrs);

    const iconDeleteCartAttrs: IAttributes = {
      tag: 'i',
      classList: ['small', 'material-icons'],
      content: 'delete',
    };
    this.iconDeleteCart = new BaseComponent(iconDeleteCartAttrs);

    const { id } = this.productCartData.lineItem;

    this.iconDeleteCart.node.addEventListener('click', () => {
      currentCart.removeProduct(id, this._updateCallback?.bind(this));
      this._htmlElement.addClass('none');
    });

    contentTextCart.appendChild(contentTitleCart);
    contentTextCart.appendChild(contentDeleteCart);
    contentDeleteCart.appendChild(this.iconDeleteCart);

    // блок для цен и количества
    const digitsTitleCartAttrs: IAttributes = {
      classList: ['cart-digits'],
    };
    const digitsTitleCart = new BaseComponent(digitsTitleCartAttrs);

    // блок для цен и количества => внутри два блока
    const pricesProductAttrs: IAttributes = {
      classList: ['cart-product-prices'],
    };
    this.pricesContainer = new BaseComponent(pricesProductAttrs);

    const { lineItem } = this.productCartData;
    // Основная цена
    const price = `${(lineItem.variant.prices[0].value.centAmount / 10 ** lineItem.variant.prices[0].value.fractionDigits).toFixed(lineItem.variant.prices[0].value.fractionDigits)}`;

    // Скидочная цена
    const discountedPrice =
      lineItem.variant.prices[0].discounted &&
      lineItem.variant.prices[0].discounted.value
        ? `${(lineItem.variant.prices[0].discounted.value.centAmount / 10 ** lineItem.variant.prices[0].discounted.value.fractionDigits).toFixed(lineItem.variant.prices[0].discounted.value.fractionDigits)}`
        : '';

    const productPriceAttrs: IAttributes = {
      classList: ['cart-product-price'],
      content: `$ ${price}`,
    };
    const productPrice = new BaseComponent(productPriceAttrs);
    this.pricesContainer.appendChild(productPrice);

    // Добавляем цену со скидкой только если она есть

    // Условное добавление элемента для скидочной цены, если она существует
    if (discountedPrice) {
      const discountedPriceAttrs: IAttributes = {
        classList: ['cart-product-discounted-price'],
        content: `$ ${discountedPrice}`,
      };
      const discountedPriceElement = new BaseComponent(discountedPriceAttrs);
      this.pricesContainer.appendChild(discountedPriceElement);
      productPrice.addClass('price-strikethrough');
    }

    // добавляем блок для изменения количества
    const blockCountContainerAttrs: IAttributes = {
      classList: ['cart-block-count'],
    };
    const blockCountContainer = new BaseComponent(blockCountContainerAttrs);

    const blockCountButtonMinusAttrs: IButtonAttributes = {
      classList: ['cart-block-count-minus'],
      content: '-',
    };
    const blockCountButtonMinus = new BaseComponent(blockCountButtonMinusAttrs);

    // Добавляем контейнер для количества
    const { quantity } = this.productCartData.lineItem;

    const productCountAttrs: IAttributes = {
      classList: ['cart-product-quantity'],
      content: `${quantity}`,
    };
    const productCount = new BaseComponent(productCountAttrs);

    const blockCountButtonPlusAttrs: IButtonAttributes = {
      classList: ['cart-block-count-plus'],
      content: '+',
    };
    const blockCountButtonPlus = new BaseComponent(blockCountButtonPlusAttrs);

    // обработка клика
    blockCountButtonMinus.node.addEventListener('click', () => {
      const currentQuantity = parseInt(productCount.textContent, 10);
      if (currentQuantity > 1) {
        productCount.textContent = (currentQuantity - 1).toString();
        /* TODO: Кодить сюда */
      }
    });

    blockCountButtonPlus.node.addEventListener('click', () => {
      const currentQuantity = parseInt(productCount.textContent, 10);
      productCount.textContent = (currentQuantity + 1).toString();
      /* TODO: Кодить сюда */
    });

    blockCountContainer.appendChild(blockCountButtonMinus);
    blockCountContainer.appendChild(productCount);
    blockCountContainer.appendChild(blockCountButtonPlus);

    digitsTitleCart.appendChild(this.pricesContainer);
    digitsTitleCart.appendChild(blockCountContainer);

    // this.imageContainerCart.appendChild(imageProductCart);

    this.contentContainerCart.appendChild(contentTextCart);
    this.contentContainerCart.appendChild(digitsTitleCart);

    // убираем в основной блок
    detailsProductCart.appendChild(this.contentContainerCart);
  }

  // private initializeProductCountBlockCart(detailsProductCart: BaseComponent) {}
}
