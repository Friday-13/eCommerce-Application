import { BaseComponent, IAttributes } from './base-component';
import { AnchorComponent, IAnchorAttrs } from './anchor-component';

export interface IAnchorWithIconAttributes extends IAnchorAttrs {
  icon?: string;
}

export class AnchorWithIconComponent extends AnchorComponent {
  private _icon = new BaseComponent({});

  constructor(attrs: IAnchorWithIconAttributes) {
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
