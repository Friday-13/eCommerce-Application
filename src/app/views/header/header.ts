import { BaseComponent, IAttributes } from '@components/base-component';
import { AnchorComponent, IAnchorAttrs } from '@components/anchor-component';
import View from '@views/view';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import Router from '@utils/router';

export default class HeaderView extends View {
  private headerInitialized: boolean;

  constructor() {
    const attrs: IAttributes = {
      tag: 'header',
      classList: ['header'],
    };
    super(attrs);
    this.headerInitialized = false;
  }

  public initializeHeader() {
    this.htmlElement.innerHTML = '';

    if (this.headerInitialized) {
      return;
    }
    const navAttrs: IAttributes = {
      tag: 'nav',
    };
    const nav = new BaseComponent(navAttrs);

    const divAttrs: IAttributes = {
      classList: ['nav-wrapper'],
    };
    const navContainer = new BaseComponent(divAttrs);

    const logoImgAttrs: IImageAttributes = {
      src: '/src/assets/logo.webp',
      alt: 'Logo',
      classList: ['logo'],
    };
    const logoImg = new ImageComponent(logoImgAttrs);

    logoImg.node.addEventListener('click', (event) => {
      event.preventDefault();
      Router.navigateTo('#main');
    });

    const menuListAttrs: IAttributes = {
      tag: 'ul',
      id: 'nav-mobile',
      classList: ['right', 'hide-on-med-and-down'],
    };
    const menuListUl = new BaseComponent(menuListAttrs);

    const createMenuItem = (href: string, content: string): BaseComponent => {
      const itemAttrs: IAttributes = {
        tag: 'li',
      };
      const item = new BaseComponent(itemAttrs);

      const linkAttrs: IAnchorAttrs = {
        href,
        content,
        classList: ['waves-effect waves-light no-text-transform'],
      };
      const link = new AnchorComponent(linkAttrs);

      link.node.addEventListener('click', (event) => {
        event.preventDefault();
        Router.navigateTo(href);
      });

      item.appendChild(link);
      return item;
    };

    const menuItems = [
      createMenuItem('#login', 'Sign in'),
      createMenuItem('#registration', 'Sign up'),
      createMenuItem('#signout', 'Sign out'),
    ];

    menuItems.forEach((item) => menuListUl.appendChild(item));

    navContainer.appendChild(logoImg);
    navContainer.appendChild(menuListUl);
    nav.appendChild(navContainer);
    this.appendChild(nav);
  }
}
