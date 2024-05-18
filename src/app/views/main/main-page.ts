import View from '@views/view';
import { BaseComponent, IAttributes } from '@components/base-component';
import FooterView from '@views/footer/footer';
import HeaderView from '@views/header/header';

export default class MainView extends View {
  private headerView: HeaderView;

  private footerView: FooterView;

  constructor() {
    const attrs: IAttributes = {
      tag: 'main',
      classList: ['main'],
    };
    super(attrs);
    this.headerView = new HeaderView();
    this.footerView = new FooterView();
    this.initializeContent();
  }

  private initializeContent(): void {
    const mainContainerAttrs: IAttributes = {
      classList: ['main__container'],
    };
    const mainContainer = new BaseComponent(mainContainerAttrs);
    this.appendChild(mainContainer);

    // Инициализируем и добавляем header
    this.headerView.initializeHeader();
    document.body.appendChild(this.headerView.htmlElement);

    // Добавляем main
    document.body.appendChild(this.htmlElement);

    // Инициализируем и добавляем footer
    this.footerView.initializeFooter();
    document.body.appendChild(this.footerView.htmlElement);
  }
}
