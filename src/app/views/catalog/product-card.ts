import { BaseComponent, IAttributes } from '@components/base-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import View from '@views/view';
import defaultImage1 from '@assets/catalog/default-stitch-1.png';
import defaultImage2 from '@assets/catalog/default-stitch-2.png';
import defaultImage3 from '@assets/catalog/default-stitch-3.jpg';
import styles from './card-style.module.scss';

export default class ProductCardView extends View {
  private _container = new BaseComponent({});

  private _image = new ImageComponent({});

  private _title = new BaseComponent({});

  constructor() {
    const attrs: IAttributes = {
      classList: ['col', 's12', 'm6', 'l4'],
    };
    super(attrs);
    this.addCardContiner();
    this.addImage();
    this.addContent();
    this.addDiscription();
  }

  addCardContiner() {
    const attrs: IAttributes = {
      classList: ['card', styles.productCard],
    };
    this._container = new BaseComponent(attrs);
    this.appendChild(this._container);
  }

  private static getRandomDefaultImage() {
    const images = [defaultImage1, defaultImage2, defaultImage3];
    return images[Math.floor(Math.random() * images.length)];
  }

  addImage() {
    const containerAttrs: IAttributes = {
      classList: ['card-image', 'waves-effect', 'waves-block', 'waves-light'],
    };
    const imgContainer = new BaseComponent(containerAttrs);
    const imgAttrs: IImageAttributes = {
      src: ProductCardView.getRandomDefaultImage(),
    };
    this._image = new ImageComponent(imgAttrs);
    imgContainer.appendChild(this._image);
    this._container.appendChild(imgContainer);
  }

  addContent() {
    const containerAttrs: IAttributes = {
      classList: 'card-content',
    };
    const container = new BaseComponent(containerAttrs);

    const titleAttrs: IAttributes = {
      classList: ['card-title', 'grey-text', 'text-darken-4'],
      content: 'Card title',
    };
    this._title = new BaseComponent(titleAttrs);
    this._title.appendChild(
      new BaseComponent({
        classList: 'material-icons right activator',
        content: 'more_vert',
        tag: 'i',
      })
    );

    container.appendChild(this._title);
    this._container.appendChild(container);
  }

  addDiscription() {
    const containerAttrs: IAttributes = {
      classList: 'card-reveal',
    };

    const container = new BaseComponent(containerAttrs);

    const titleAttrs: IAttributes = {
      classList: ['card-title', 'grey-text', 'text-darken-4'],
      content: 'Card title',
    };
    const title = new BaseComponent(titleAttrs);

    const discriptionAttrs: IAttributes = {
      tag: 'p',
    };
    const discription = new BaseComponent(discriptionAttrs);
    discription.textContent =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan nibh non urna dignissim consectetur. Mauris consequat sed odio eu venenatis. Donec sed sem et lorem ornare fringilla vel in orci. Pellentesque eu risus mattis, porttitor libero ut, ornare orci. Pellentesque posuere felis elit, id ultrices purus euismod varius. Proin interdum eros eu eleifend efficitur. Quisque elementum sed odio sed tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras venenatis auctor ante vel rutrum. Cras id fermentum ante.';

    container.appendChild(title);
    container.appendChild(discription);
    this._container.appendChild(container);
  }
}
