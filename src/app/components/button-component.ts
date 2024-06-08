import { BaseComponent, IAttributes } from './base-component';

export interface IButtonAttributes extends IAttributes {
  type?: 'submit' | 'reset' | 'button';
  onClick?: (event?: Event) => void;
  disabled?: boolean;
}
export class ButtonComponent extends BaseComponent<HTMLButtonElement> {
  constructor(attrs: IButtonAttributes) {
    const mergedAttrs = attrs;
    const defaultStyles = ['waves-effect', 'waves-light', 'btn'];
    mergedAttrs.tag = attrs.tag ? attrs.tag : 'button';
    mergedAttrs.classList = attrs.classList ? attrs.classList : defaultStyles;
    super(mergedAttrs);
    if (mergedAttrs.type) {
      this.node.type = mergedAttrs.type;
    }
    if (mergedAttrs.onClick) {
      this.node.addEventListener('click', mergedAttrs.onClick);
    }
    if (mergedAttrs.disabled) {
      this.node.disabled = mergedAttrs.disabled;
    }
  }

  set disabled(newState: boolean) {
    this.node.disabled = newState;
  }

  get disabled() {
    return this.node.disabled;
  }
}
