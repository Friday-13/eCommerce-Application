import { AnchorComponent, IAnchorAttrs } from '@components/anchor-component';
import { BaseComponent, IAttributes } from '@components/base-component';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import Router from '@utils/router';
import View from '@views/view';

export default class Error404 extends View {
  constructor() {
    const attrs: IAttributes = {
      classList: ['error'],
    };
    super(attrs);
    this.initializePageContent();
    this.addHomeButton();
  }

  public addHomeButton(): void {
    const errorButtonAttrs: IAnchorAttrs = {
      classList: ['button-error', 'waves-effect waves-light btn-large'],
      href: '/',
      content: 'Back to homepage',
    };
    const errorButton = new AnchorComponent(errorButtonAttrs);
    this.appendChild(errorButton);
    errorButton.node.addEventListener('click', (event) => {
      event.preventDefault();
      Router.navigateTo('main');
    });
  }

  public initializePageContent(): void {
    const pageBody404Attrs: IAttributes = {
      classList: ['page-image'],
    };
    const pageBody404 = new BaseComponent(pageBody404Attrs);

    const image404Attrs: IImageAttributes = {
      src: '/src/assets/404/lego-man.png',
      alt: 'lego-man',
      classList: ['page-image-man'],
    };
    const image404 = new ImageComponent(image404Attrs);
    pageBody404.appendChild(image404);

    const body404Attrs: IAttributes = {
      classList: ['page-image-body'],
    };
    const body404Container = new BaseComponent(body404Attrs);
    pageBody404.appendChild(body404Container);

    const title404Attrs: IAttributes = {
      tag: 'h1',
      content: 'OH BRICKS!',
      classList: ['page-image__title'],
    };
    const title404 = new BaseComponent(title404Attrs);
    body404Container.appendChild(title404);

    const subtitle404Attrs: IAttributes = {
      tag: 'h2',
      content: 'We can’t find this page.',
      classList: ['page-image__subtitle'],
    };
    const subtitle404 = new BaseComponent(subtitle404Attrs);
    body404Container.appendChild(subtitle404);

    const text404Attrs: IAttributes = {
      tag: 'p',
      content:
        'We’ll try not to lose our head over this, but if we do… we’ll put it back on.',
      classList: ['page-image__text'],
    };
    const text404 = new BaseComponent(text404Attrs);
    body404Container.appendChild(text404);

    this.appendChild(pageBody404);
  }

  public clearContent(): void {
    document.body.removeChild(this.htmlElement);
  }
}
