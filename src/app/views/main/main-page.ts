import View from '@views/view';
import { BaseComponent, IAttributes } from '@components/base-component';
import FooterView from '@views/footer/footer';
import HeaderView from '@views/header/header';

export default class MainView extends View {
  private headerView: HeaderView;

  private footerView: FooterView;

  constructor() {
    const attrs: IAttributes = {
      tag: 'div',
      classList: ['wrapper'],
    };
    super(attrs);
    this.headerView = new HeaderView();
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

    this.headerView.initializeHeader();
    this.appendChild(this.headerView);
    this.appendChild(main);
    this.footerView.initializeFooter();
    this.appendChild(this.footerView);

    document.body.appendChild(this.htmlElement);
  }
}
