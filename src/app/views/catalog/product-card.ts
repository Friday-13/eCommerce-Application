import { BaseComponent, IAttributes } from '@components/base-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import View from '@views/view';
import getRandomDefaultImage from '@utils/get-random-default-image';
import { IProductData } from '@models/products';
import createPriceComponent from '@utils/create-price-component';
import Router from '@utils/router';
import CardTitleView from './card-title';
import styles from './card-style.module.scss';

const DEFAULT_TITLE = 'Card Title';
const DEFAULT_DESCRIPTION = 'Card Description';

export default class ProductCardView extends View {
  private _container = new BaseComponent({});

  private _image = new ImageComponent({});

  private _content = new BaseComponent({});

  constructor(content: IProductData) {
    const attrs: IAttributes = {
      classList: ['col', 's12', 'm6', 'l4'],
    };
    super(attrs);
    this.addCardContiner();
    this.addImage(content.id, content.imageUrls[0]); // и вот тут добавила - надеюсь дальше не пошло?
    this.addContent(content.productName);
    this.addDescription(content.productName, content.description);
    this.addPriceBlock(content.price, content.discountedPrice);
  }

  addCardContiner() {
    const attrs: IAttributes = {
      classList: ['card', styles.productCard],
    };
    this._container = new BaseComponent(attrs);
    this.appendChild(this._container);
  }

  addImage(productId: string, src: string = getRandomDefaultImage()) {
    const containerAttrs: IAttributes = {
      classList: ['card-image', 'waves-effect', 'waves-block', 'waves-light'],
    };
    const imgContainer = new BaseComponent(containerAttrs);
    const imgAttrs: IImageAttributes = {
      src,
    };
    this._image = new ImageComponent(imgAttrs);
    imgContainer.appendChild(this._image);
    // Добавление обработчика клика на изображение
    imgContainer.node.addEventListener('click', () => {
      Router.navigateTo(`#${productId}`);
    });
    this._container.appendChild(imgContainer);
  }

  addContent(title: string = DEFAULT_TITLE) {
    const containerAttrs: IAttributes = {
      classList: 'card-content',
    };
    this._content = new BaseComponent(containerAttrs);

    const titleView = new CardTitleView(title, 'more_vert');

    this._content.node.appendChild(titleView.htmlElement);
    this._container.appendChild(this._content);
  }

  addDescription(
    title: string = DEFAULT_TITLE,
    content: string = DEFAULT_DESCRIPTION
  ) {
    const containerAttrs: IAttributes = {
      classList: 'card-reveal',
    };

    const container = new BaseComponent(containerAttrs);

    const titleView = new CardTitleView(title, 'close');
    const discriptionAttrs: IAttributes = {
      tag: 'p',
    };
    const discription = new BaseComponent(discriptionAttrs);
    discription.node.innerHTML = content;

    container.node.appendChild(titleView.htmlElement);
    container.appendChild(discription);
    this._container.appendChild(container);
  }

  addPriceBlock(price: number | null, discountedPrice: number | null) {
    if (price === null) return;
    const attrs: IAttributes = {};
    const priceBlock = new BaseComponent(attrs);
    const productPrice = createPriceComponent(price);
    priceBlock.appendChild(productPrice);
    this._content.appendChild(priceBlock);

    if (discountedPrice === null) return;
    productPrice.addClass(styles.priceBlockOldPrice);
    const productDuscountedPrice = createPriceComponent(
      discountedPrice,
      styles.priceBlockNewPrice
    );
    priceBlock.appendChild(productDuscountedPrice);
  }
}
