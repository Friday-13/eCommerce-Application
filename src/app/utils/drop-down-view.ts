import { BaseComponent, IAttributes } from '@components/base-component';
import {
  AnchorWithIconComponent,
  IAnchorWithIconAttributes,
} from '@components/anchor-with-icon';
import View from '@views/view';

export default class DropdownView extends View {
  protected _applyCallback: () => void;

  protected _options: Array<BaseComponent> = [];

  currentOption?: BaseComponent;

  constructor(id: string, applyCallback: () => void) {
    const attrs: IAttributes = {
      tag: 'ul',
      classList: 'dropdown-content',
      id,
    };
    super(attrs);
    this._applyCallback = applyCallback;
  }

  createOption(text: string, onClick: () => void, icon?: string) {
    const optionAttrs: IAttributes = {
      tag: 'li',
    };
    const option = new BaseComponent(optionAttrs);
    const optionContentAttrs: IAnchorWithIconAttributes = {
      onClick: () => {
        this.selectOption(option);
        onClick();
        this._applyCallback();
      },
      content: text,
      icon,
    };
    const optionContent = new AnchorWithIconComponent(optionContentAttrs);
    option.appendChild(optionContent);
    this.appendChild(option);
    this._options.push(option);
  }

  createDivider() {
    const dividerAttrs: IAttributes = {
      tag: 'li',
      classList: 'divider',
    };
    const divider = new BaseComponent(dividerAttrs);
    divider.node.setAttribute('tabindex', '-1');
    this.appendChild(divider);
  }

  selectOption(option: BaseComponent) {
    this.currentOption = option;
  }
}
