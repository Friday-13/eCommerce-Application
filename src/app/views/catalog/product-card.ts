import { BaseComponent, IAttributes } from '@components/base-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import View from '@views/view';
import getRandomDefaultImage from '@utils/get-random-default-image';
import { IProductData } from '@models/products';
import createPriceComponent from '@utils/create-price-component';
import Router from '@utils/router';
import {
  ButtonWithIconComponent,
  IButtonWithIconAttributes,
} from '@components/button-with-icons';
import currentCart from '@services/current-cart';
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
    this.addImage(content.id, content.imageUrls[0]);
    this.addContent(content.productName);
    this.addDescription(
      content.productName,
      content.description,
      content.pieceCount,
      content.ageRange,
      content.id
    );
    this.addPriceBlock(content.price, content.discountedPrice);
    this.addAddtoCartButton();
  }

  addCardContiner() {
    const attrs: IAttributes = {
      classList: ['card', 'sticky-action', styles.productCard],
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
      // Router.navigateTo(`#product/${productId}`);
      currentCart.addProduct(productId, 1);
    });
    this._container.appendChild(imgContainer);
    this._image.node.setAttribute('loading', 'lazy');
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
    content: string = DEFAULT_DESCRIPTION,
    pieceCount: number = 100,
    ageRange: string = '6+',
    id: string = ''
  ) {
    const containerAttrs: IAttributes = {
      classList: 'card-reveal',
    };

    const container = new BaseComponent(containerAttrs);

    const titleView = new CardTitleView(title, 'close');
    const discriptionAttrs: IAttributes = {
      tag: 'p',
    };

    const pieces = new BaseComponent({ content: `${pieceCount} Pieces` });
    const age = new BaseComponent({ content: `${ageRange} Ages` });

    const discription = new BaseComponent(discriptionAttrs);
    let trimmedContent = content;
    if (trimmedContent.split(' ').length > 120) {
      trimmedContent = content.split(' ').slice(0, 50).join(' ');
      trimmedContent += '...';
    }
    discription.node.innerHTML = trimmedContent;

    const productPageBtnAttrs: IButtonWithIconAttributes = {
      classList: 'waves-effect waves-light btn-small red lighten-2',
      icon: 'arrow_forward',
      onClick: () => {
        Router.navigateTo(`#product/${id}`);
      },
    };

    const productPageBtn = new ButtonWithIconComponent(productPageBtnAttrs);

    container.node.appendChild(titleView.htmlElement);
    container.appendChild(pieces);
    container.appendChild(age);
    container.appendChild(discription);
    container.appendChild(productPageBtn);
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

  addAddtoCartButton() {
    const blockAttrs: IAttributes = {
      classList: 'card-action',
    };
    const actionBlock = new BaseComponent(blockAttrs);

    /* TODO: add checking if this product exist in card */

    const buttonAttrs: IButtonWithIconAttributes = {
      classList: 'waves-effect waves-light btn-small red lighten-2',
      icon: 'add_shopping_cart',
    };

    const button = new ButtonWithIconComponent(buttonAttrs);
    button.node.onclick = () => {
      button.disabled = !button.disabled;
      button.icon = 'playlist_add_check';
      /* TODO: Add add-to-cart feature */
    };

    actionBlock.appendChild(button);
    this._container.appendChild(actionBlock);
  }
}
