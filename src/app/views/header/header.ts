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
    // Создаем контейнер nav
    const navAttrs: IAttributes = {
      tag: 'nav',
    };
    const nav = new BaseComponent(navAttrs);

    // Создаем контейнер для логотипа и меню
    const divAttrs: IAttributes = {
      tag: 'div',
      classList: ['nav-wrapper'],
    };
    const navContainer = new BaseComponent(divAttrs);

    // Создаем логотип в виде изображения, используя ImageComponent
    const logoImgAttrs: IImageAttributes = {
      src: '/src/assets/10317098.png', // Замените на путь к вашему логотипу
      alt: 'Logo',
      classList: ['logo'],
    };
    const logoImg = new ImageComponent(logoImgAttrs);

    // Создаем список элементов меню
    const menuListAttrs: IAttributes = {
      tag: 'ul',
      id: 'nav-mobile',
      classList: ['right', 'hide-on-med-and-down'],
    };
    const menuListUl = new BaseComponent(menuListAttrs);

    // для создания элемента меню
    const createMenuItem = (href: string, content: string): BaseComponent => {
      const itemAttrs: IAttributes = {
        tag: 'li',
      };
      const item = new BaseComponent(itemAttrs);

      const linkAttrs: IAnchorAttrs = {
        href,
        content,
        classList: ['waves-effect waves-light btn-small'],
      };
      const link = new AnchorComponent(linkAttrs);

      item.appendChild(link);
      return item;
    };

    // Создаем элементы меню
    const menuItems = [
      createMenuItem('#signin', 'Sign in'),
      createMenuItem('#signup', 'Sign up'),
      createMenuItem('#signout', 'Sign out'),
    ];

    // Добавляем элементы в список меню
    menuItems.forEach((item) => menuListUl.appendChild(item));

    // Собираем все элементы вместе
    navContainer.appendChild(logoImg);
    navContainer.appendChild(menuListUl);
    nav.appendChild(navContainer);
    this.appendChild(nav);
  }
}
