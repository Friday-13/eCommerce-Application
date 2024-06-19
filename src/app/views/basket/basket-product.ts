import { BaseComponent, IAttributes } from '@components/base-component';
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

  constructor(productCartData: IProductCartData) {
    const attrs: IAttributes = {
      tag: 'article',
      classList: 'card',
    };
    super(attrs);
    this.productCartData = productCartData;
    this.initializeContentProductBlockInCart();
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

    // const cartId = cartHandler.currentCartId as string;
    // const cartVersion = cartHandler.currentCartVersion as number;
    const { id } = this.productCartData.lineItem;

    this.iconDeleteCart.node.addEventListener('click', () => {
      currentCart.removeProduct(
        id
        // (cartData) => {
        //   console.log('Product removed from cart:', cartData);
        //   this._htmlElement.addClass('none');
        //   const userId = CookieManager.getUserId();
        //   // Проверка на наличие userID для определения типа пользователя
        //   if (userId) {
        //     // Зарегистрированный пользователь
        //     cartHandler.currentCustomerCartId = cartData.id;
        //     cartHandler.currentCustomerCartVersion = cartData.version;
        //     cartHandler.saveCartAuthToLocalStorage();
        //   } else {
        //     // Анонимный пользователь
        //     cartHandler.currentCartId = cartData.id;
        //     cartHandler.currentCartVersion = cartData.version;
        //     cartHandler.saveCartToLocalStorage();
        //   }
        //   console.log(id);
        //   localStorage.removeItem(`product-${id}-disabled`);
        // },
        // (errorMessage) => {
        //   console.error('Error removing product from cart:', errorMessage);
        // }
      );
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

    // const price = `${(this.productCartData.lineItem.price.value.centAmount / 10 ** this.productCartData.lineItem.price.value.fractionDigits).toFixed(this.productCartData.lineItem.price.value.fractionDigits)}`;

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

    const { quantity } = this.productCartData.lineItem;

    // Добавляем контейнер для количества
    const productCountAttrs: IAttributes = {
      classList: ['cart-product-quantity'],
      content: `${quantity}`,
    };
    const productCount = new BaseComponent(productCountAttrs);

    digitsTitleCart.appendChild(this.pricesContainer);
    digitsTitleCart.appendChild(productCount);

    // this.imageContainerCart.appendChild(imageProductCart);

    this.contentContainerCart.appendChild(contentTextCart);
    this.contentContainerCart.appendChild(digitsTitleCart);

    // убираем в основной блок
    detailsProductCart.appendChild(this.contentContainerCart);
  }
}
