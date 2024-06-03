import { BaseComponent, IAttributes } from './base-component';
import { InputComponent } from './input-component';
import { LabelComponent } from './label-component';

export interface ICheckboxAttributes extends IAttributes {
  checked?: boolean;
  onClick?: (event?: Event) => void;
  disabled?: boolean;
  content?: string;
}

export class CheckboxComponent extends BaseComponent {
  private _checkbox: InputComponent;

  constructor(attrs: ICheckboxAttributes) {
    const wrapperAttrs: IAttributes = {
      tag: 'p',
    };
    super(wrapperAttrs);
    const label = new LabelComponent({});
    this._checkbox = new InputComponent({
      type: 'checkbox',
      classList: attrs.classList ? attrs.classList : 'filled-in',
    });
    const content = new BaseComponent({ content: attrs.content, tag: 'span' });
    this.appendChild(label);
    label.appendChild(this._checkbox);
    label.appendChild(content);

    if (attrs.onClick) {
      this._checkbox.node.addEventListener('click', attrs.onClick);
    }
    if (attrs.disabled !== undefined) {
      this._checkbox.node.disabled = attrs.disabled;
    }
  }

  get checked(): boolean {
    return this._checkbox.node.checked;
  }

  set checked(isChecked: boolean) {
    this._checkbox.node.checked = isChecked;
  }
}
