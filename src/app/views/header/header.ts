import { BaseComponent, IAttributes } from '@components/base-component';
import { AnchorComponent, IAnchorAttrs } from '@components/anchor-component';
import View from '@views/view';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import Router from '@utils/router';
import { customerClear, isCustomerAuthorized } from '@models/customer';
import logoUrl from '@assets/logo.webp';

export default class HeaderView extends View {
  private headerInitialized: boolean;

  private menuListUl = new BaseComponent({});

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
      src: logoUrl,
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
      classList: ['right', 'nav-list-button'],
    };
    this.menuListUl = new BaseComponent(menuListAttrs);
    this.updateMenu();

    navContainer.appendChild(logoImg);
    navContainer.appendChild(this.menuListUl);
    nav.appendChild(navContainer);
    this.appendChild(nav);
  }

  public updateMenu() {
    this.menuListUl.node.innerHTML = '';
    const createMenuItem = (
      href: string,
      content: string,
      callback?: () => void
    ): BaseComponent => {
      const itemAttrs: IAttributes = {
        tag: 'li',
        classList: [
          'list-item-nav waves-effect waves-light btn no-text-transform',
        ],
      };
      const item = new BaseComponent(itemAttrs);

      const linkAttrs: IAnchorAttrs = {
        href,
        content,
        // classList: ['hgh'],
      };
      const link = new AnchorComponent(linkAttrs);

      link.node.addEventListener('click', (event) => {
        event.preventDefault();
        if (callback) {
          callback();
        }
        Router.navigateTo(href);
      });

      item.appendChild(link);
      return item;
    };

    const menuItems = [];

    if (isCustomerAuthorized()) {
      menuItems.push(
        createMenuItem('#catalog', 'Catalog'),
        createMenuItem('#about-us', 'About Us'),
        createMenuItem('#login', 'Sign out', customerClear),
        createMenuItem('#profile', 'Profile'),
        createMenuItem('#cart', 'Cart')
      );
    } else {
      menuItems.push(
        createMenuItem('#catalog', 'Catalog'),
        createMenuItem('#about-us', 'About Us'),
        createMenuItem('#login', 'Sign in'),
        createMenuItem('#registration', 'Sign up'),
        createMenuItem('#cart', 'Cart')
      );
    }
    menuItems.forEach((item) => this.menuListUl.appendChild(item));
  }
}
