import View from '@views/view';
import { BaseComponent, IAttributes } from '@components/base-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';

export default class MainPageView extends View {
  private mainContainer!: BaseComponent; // добавлять разные блоки сюда

  constructor() {
    const attrs: IAttributes = {};
    super(attrs);
    this.initializeMainContent();
  }

  private initializeMainContent(): void {
    const mainContainerAttrs: IAttributes = {
      classList: ['main-container'],
    };
    this.mainContainer = new BaseComponent(mainContainerAttrs);

    const mainImgAttrs: IImageAttributes = {
      src: '/src/assets/main-image.webp',
      alt: 'Car',
      classList: ['main-image', 'responsive-img'],
    };
    const mainImg = new ImageComponent(mainImgAttrs);

    this.mainContainer.appendChild(mainImg);
    this.appendChild(this.mainContainer);
    document.body.appendChild(this.htmlElement);
  }
}
