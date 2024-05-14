import { BaseComponent, IAttributes } from '@components/base-component';
import { AnchorComponent, IAnchorAttrs } from '@components/anchor-component';
import View from '@views/view';

export default class FooterView extends View {
  constructor() {
    const attrs: IAttributes = {
      tag: 'footer',
      classList: ['footer'],
    };
    super(attrs);
    this.initializeFooter();
  }

  public initializeFooter() {
    // Создаем контейнер внутри footer
    const containerAttrs: IAttributes = {
      tag: 'div',
      classList: 'footer__container',
    };
    const container = new BaseComponent(containerAttrs);

    // Создаем список элементов
    const itemListAttrs: IAttributes = {
      tag: 'ul',
      classList: 'footer__items',
    };
    const itemList = new BaseComponent(itemListAttrs);

    // Создаем первый элемент списка с текстом "Привет"
    const item1Attrs: IAttributes = {
      tag: 'li',
      classList: 'footer__item',
      content: 'Привет',
    };
    const item1 = new BaseComponent(item1Attrs);

    // Создаем второй элемент списка с текстом "Привет" и ссылкой
    const item2Attrs: IAttributes = {
      tag: 'li',
      classList: 'footer__item',
    };
    const item2 = new BaseComponent(item2Attrs);
    const link2Attrs: IAnchorAttrs = {
      href: '#teams',
      content: 'Привет',
    };
    const link2 = new AnchorComponent(link2Attrs);
    item2.appendChild(link2);

    // Создаем третий элемент списка с текстом "Привет" и ссылкой
    const item3Attrs: IAttributes = {
      tag: 'li',
      classList: 'footer__item',
    };
    const item3 = new BaseComponent(item3Attrs);
    const link3Attrs: IAnchorAttrs = {
      href: '#school',
      content: 'Привет',
    };
    const link3 = new AnchorComponent(link3Attrs);
    item3.appendChild(link3);

    // Собираем все элементы вместе
    itemList.appendChild(item1);
    itemList.appendChild(item2);
    itemList.appendChild(item3);

    // Добавляем список в контейнер и контейнер в футер
    container.appendChild(itemList);
    this.appendChild(container);
  }
}
