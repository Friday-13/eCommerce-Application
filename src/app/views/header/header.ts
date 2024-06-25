import { BaseComponent, IAttributes } from '@components/base-component';
import { AnchorComponent, IAnchorAttrs } from '@components/anchor-component';
import View from '@views/view';
import { IImageAttributes, ImageComponent } from '@components/image-component';
import Router from '@utils/router';
import logoUrl from '@assets/logo.webp';
import { IButtonAttributes } from '@components/button-component';
import logoutCustomer from '@services/logout-customer';
import CookieManager from '@utils/cookie';

export default class HeaderView extends View {
  private headerInitialized: boolean;

  private navContainer!: BaseComponent;

  private menuContainerList!: BaseComponent;

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
    this.navContainer = new BaseComponent(divAttrs);

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

    const menuContainerListAttrs: IAttributes = {
      classList: ['menu-body'],
    };
    this.menuContainerList = new BaseComponent(menuContainerListAttrs);

    const menuListAttrs: IAttributes = {
      tag: 'ul',
      id: 'nav-mobile',
      classList: ['right', 'nav-list-button'],
    };
    this.menuListUl = new BaseComponent(menuListAttrs);
    this.menuContainerList.appendChild(this.menuListUl);
    this.updateMenu();

    this.navContainer.appendChild(logoImg);
    this.navContainer.appendChild(this.menuContainerList);
    nav.appendChild(this.navContainer);
    this.appendChild(nav);
    this.initializeBurgerMenu();
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

      if (content === 'About Us') {
        const iconHtml =
          '<i class="tiny material-icons header-icons">group</i>';
        link.node.innerHTML = iconHtml;
      }
      if (content === 'Cart') {
        const iconHtml =
          '<i class="tiny material-icons header-icons">shopping_cart</i>';
        link.node.innerHTML = iconHtml;
      }

      link.node.addEventListener('click', (event) => {
        event.preventDefault();
        if (callback) {
          callback();
        }
        Router.navigateTo(href);
        document.body.classList.remove('lock');
        this.menuContainerList.node.classList.toggle('menu-active');
      });

      item.appendChild(link);
      return item;
    };

    const menuItems = [];

    if (CookieManager.isCustomerAuthorized()) {
      menuItems.push(
        createMenuItem('#catalog', 'Catalog'),
        createMenuItem('#login', 'Sign out', logoutCustomer),
        createMenuItem('#profile', 'Profile'),
        createMenuItem('#about-us', 'About Us'),
        createMenuItem('#cart', 'Cart')
      );
    } else {
      menuItems.push(
        createMenuItem('#catalog', 'Catalog'),
        createMenuItem('#login', 'Sign in'),
        createMenuItem('#registration', 'Sign up'),
        createMenuItem('#about-us', 'About Us'),
        createMenuItem('#cart', 'Cart')
      );
    }
    menuItems.forEach((item) => this.menuListUl.appendChild(item));
  }

  public initializeBurgerMenu() {
    const closeButtonBurgerAttrs: IButtonAttributes = {
      classList: ['button-close-burger'],
    };
    const closeButtonBurger = new BaseComponent(closeButtonBurgerAttrs);
    this.navContainer.appendChild(closeButtonBurger);

    closeButtonBurger.node.addEventListener('click', (event) => {
      event.preventDefault();
      document.body.classList.toggle('lock');
      closeButtonBurger.node.classList.toggle('menu-active');
      this.menuContainerList.node.classList.toggle('menu-active');
    });

    const topBarAttrs: IAttributes = {
      tag: 'span',
      classList: ['icon-menu-top'],
    };
    const topBarBurger = new BaseComponent(topBarAttrs);
    closeButtonBurger.appendChild(topBarBurger);

    const bottomBarAttrs: IAttributes = {
      tag: 'span',
      classList: ['icon-menu-bottom'],
    };
    const bottomBarBurger = new BaseComponent(bottomBarAttrs);
    closeButtonBurger.appendChild(bottomBarBurger);
  }
}
