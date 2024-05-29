import { BaseComponent, IAttributes } from '@components/base-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import View from '@views/view';
import getRandomDefaultImage from '@utils/get-random-default-image';
import CardTitleView from './card-title';
import styles from './card-style.module.scss';

interface IProductCard {
  imgSrc?: string;
  title?: string;
  description?: string;
}

const DEFAULT_TITLE = 'Card Title';
const DEFAULT_DESCRIPTION = 'Card Description';

export default class ProductCardView extends View {
  private _container = new BaseComponent({});

  private _image = new ImageComponent({});

  constructor(content: IProductCard) {
    const attrs: IAttributes = {
      classList: ['col', 's12', 'm6', 'l4'],
    };
    super(attrs);
    this.addCardContiner();
    this.addImage(content.imgSrc);
    this.addContent(content.title);
    this.addDescription(content.title, content.description);
  }

  addCardContiner() {
    const attrs: IAttributes = {
      classList: ['card', styles.productCard],
    };
    this._container = new BaseComponent(attrs);
    this.appendChild(this._container);
  }

  addImage(src: string = getRandomDefaultImage()) {
    const containerAttrs: IAttributes = {
      classList: ['card-image', 'waves-effect', 'waves-block', 'waves-light'],
    };
    const imgContainer = new BaseComponent(containerAttrs);
    const imgAttrs: IImageAttributes = {
      src,
    };
    this._image = new ImageComponent(imgAttrs);
    imgContainer.appendChild(this._image);
    this._container.appendChild(imgContainer);
  }

  addContent(title: string = DEFAULT_TITLE) {
    const containerAttrs: IAttributes = {
      classList: 'card-content',
    };
    const container = new BaseComponent(containerAttrs);

    const titleView = new CardTitleView(title, 'more_vert');

    container.node.appendChild(titleView.htmlElement);
    this._container.appendChild(container);
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
    discription.textContent = content;

    container.node.appendChild(titleView.htmlElement);
    container.appendChild(discription);
    this._container.appendChild(container);
  }
}
