import View from '@views/view';
import { BaseComponent, IAttributes } from '@components/base-component';

export default class MainView extends View {
  private mainContainer!: BaseComponent;  // добавлять разные блоки сюда

  constructor() {
    const attrs: IAttributes = {
      tag: 'main',
      classList: ['main'],
    };
    super(attrs);    
    this.initializeMainContent();
  }

  private initializeMainContent(): void {
    const mainContainerAttrs: IAttributes = {
      classList: ['main__container'],
      content: 'SOS'
    };
    this.mainContainer = new BaseComponent(mainContainerAttrs);
    this.appendChild(this.mainContainer);
    document.body.appendChild(this.htmlElement);    
  }  
}
