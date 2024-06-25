import { BaseComponent, IAttributes } from '@components/base-component';
import { ImageComponent } from '@components/image-component';
import { Parallax } from 'materialize-css';
import initMaterializeComponent from '@utils/materilalize-js-init';
import View from './view';

export default class ParallaxView extends View {
  private _parallax = new BaseComponent({});

  private _image = new ImageComponent({});

  constructor(id: string, imageSrc: string) {
    const attrs: IAttributes = {
      classList: 'parallax-container',
    };
    super(attrs);

    this._parallax = new BaseComponent({ classList: 'parallax', id });
    this._image = new ImageComponent({ src: imageSrc });

    this._parallax.appendChild(this._image);
    this.appendChild(this._parallax);

    initMaterializeComponent(`#${id}`, document.body, () => {
      Parallax.init(this._parallax.node);
    });
  }
}
