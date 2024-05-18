import { BaseComponent, IAttributes } from '@components/base-component';
import { AnchorComponent, IAnchorAttrs } from '@components/anchor-component';
import View from '@views/view';
import { IImageAttributes, ImageComponent } from '@components/image-component';

export default class HeaderView extends View {
  constructor() {
    const attrs: IAttributes = {
      tag: 'header',
      classList: ['header'],
    };
    super(attrs);
  }

  public initializeHeader() {
    const navAttrs: IAttributes = {
      tag: 'nav',
    };
    const nav = new BaseComponent(navAttrs);

    const divAttrs: IAttributes = {
      tag: 'div',
      classList: ['nav-wrapper'],
    };
    const navContainer = new BaseComponent(divAttrs);

    const logoImgAttrs: IImageAttributes = {
      src: '#',
      alt: 'Logo',
      classList: ['logo'],
    };
    const logoImg = new ImageComponent(logoImgAttrs);

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

      item.appendChild(link);
      return item;
    };

    const menuItems = [
      createMenuItem('#signin', 'Sign in'),
      createMenuItem('#signup', 'Sign up'),
      createMenuItem('#signout', 'Sign out'),
    ];

    menuItems.forEach((item) => menuListUl.appendChild(item));

    navContainer.appendChild(logoImg);
    navContainer.appendChild(menuListUl);
    nav.appendChild(navContainer);
    this.appendChild(nav);
  }
}
