import { BaseComponent, IAttributes } from './base-component';

export interface IBaseWithIconAttributes extends IAttributes {
  icon?: string;
}

export class ButtonWithIconComponent extends BaseComponent {
  private _icon = new BaseComponent({});

  constructor(attrs: IBaseWithIconAttributes) {
    super(attrs);
    this.createIcon();
    if (attrs.icon) {
      this.icon = attrs.icon;
    }
  }

  createIcon() {
    const attrs: IAttributes = {
      classList: 'material-icons',
      tag: 'i',
    };
    this._icon = new BaseComponent(attrs);
    this.appendChild(this._icon);
  }

  set icon(iconCode: string) {
    this._icon.textContent = iconCode;
  }

  get icon() {
    return this._icon.textContent;
  }

  set textContent(content: string) {
    super.textContent = content;
    this.appendChild(this._icon);
  }
}
