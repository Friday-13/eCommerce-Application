import { BaseComponent, IAttributes } from '@components/base-component';
import { AnchorComponent, IAnchorAttrs } from '@components/anchor-component';
import View from '@views/view';

export default class FooterView extends View {
  constructor() {
    const attrs: IAttributes = {
      tag: 'footer',
      classList: ['page-footer'],
    };
    super(attrs);
  }

  public initializeFooter() {
    // Создаем контейнер внутри footer
    const containerAttrs: IAttributes = {
      tag: 'div',
      classList: ['footer-container'],
    };
    const container = new BaseComponent(containerAttrs);

    // Создаем список элементов
    const itemListAttrs: IAttributes = {
      tag: 'ul',
      classList: ['footer-items'],
    };
    const itemList = new BaseComponent(itemListAttrs);

    // Создаем первый элемент списка
    const itemYearAttrs: IAttributes = {
      tag: 'li',
      classList: ['footer-item'],
      content: '2024',
    };
    const itemYear = new BaseComponent(itemYearAttrs);

    // Создаем второй элемент списка - ссылка
    const itemTeamAttrs: IAttributes = {
      tag: 'li',
      classList: ['footer__item'],
    };
    const itemTeam = new BaseComponent(itemTeamAttrs);
    const linkTeamAttrs: IAnchorAttrs = {
      href: '#team',
      content: 'CodeCraft',
      target: '_blank',
    };
    const linkTeam = new AnchorComponent(linkTeamAttrs);
    itemTeam.appendChild(linkTeam);

    // Создаем третий элемент списка - ссылка
    const itemSchoolAttrs: IAttributes = {
      tag: 'li',
      classList: ['footer__item'],
    };
    const itemSchool = new BaseComponent(itemSchoolAttrs);
    const linkSchoolAttrs: IAnchorAttrs = {
      href: 'https://rs.school/',
      content: 'RS School',
      target: '_blank',
    };
    const linkSchool = new AnchorComponent(linkSchoolAttrs);
    itemSchool.appendChild(linkSchool);

    // Собираем все элементы вместе
    itemList.appendChild(itemYear);
    itemList.appendChild(itemTeam);
    itemList.appendChild(itemSchool);

    // Добавляем список в контейнер и контейнер в футер
    container.appendChild(itemList);
    this.appendChild(container);
  }
}
