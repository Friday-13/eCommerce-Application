import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';

export default class CardTitleView extends View {
  protected _title: string = '';

  protected _icon: BaseComponent = new BaseComponent({});

  constructor(title: string = '', iconName: string = 'error_outline') {
    const attrs: IAttributes = {
      classList: ['card-title', 'grey-text', 'text-darken-4'],
    };
    super(attrs);
    this.createIcon(iconName);
    this.title = title;
  }

  createIcon(iconName: string) {
    const attrs: IAttributes = {
      classList: 'material-icons right activator',
      tag: 'i',
      content: iconName,
    };
    this._icon = new BaseComponent(attrs);
  }

  set title(content: string) {
    this._title = content;
    this.htmlElement.textContent = this._title;
    this.appendChild(this._icon);
  }

  get title() {
    return this._title;
  }

  set icon(iconName: string) {
    this._icon.textContent = iconName;
  }
}
