import View from '@views/view';
import { BaseComponent, IAttributes } from '@components/base-component';
import FooterView from '@views/footer/footer';

export default class MainView extends View {
  private footerView: FooterView;

  constructor() {
    const attrs: IAttributes = {
      tag: 'div',
      classList: ['wrapper'],
    };
    super(attrs);
    this.footerView = new FooterView();
    this.initializeContent();
  }

  private initializeContent(): void {
    const mainAttrs: IAttributes = {
      tag: 'main',
      classList: 'main',
    };
    const main = new BaseComponent(mainAttrs);
    const mainContainerAttrs: IAttributes = {
      tag: 'div',
      classList: 'main__container',
    };
    const mainContainer = new BaseComponent(mainContainerAttrs);
    main.appendChild(mainContainer);

    this.appendChild(main);
    this.footerView.initializeFooter();
    // this.appendChild(this.footerView.htmlElement); // ошибка не знаю как добавить footer

    document.body.appendChild(this.htmlElement);

    // this.createHeader(mainShadow);
    // this.createBody(mainShadow);
    // this.createFooter(mainShadow);
  }
}
