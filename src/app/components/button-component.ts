import { BaseComponent, IAttributes } from './base-component';

export interface IButtonAttributes extends IAttributes {
  type?: 'submit' | 'reset' | 'button';
  onClick?: (event?: Event) => void;
}
export class ButtonComponent extends BaseComponent<HTMLButtonElement> {
  constructor(attrs: IButtonAttributes) {
    const mergedAttrs = attrs;
    mergedAttrs.tag = attrs.tag ? attrs.tag : 'button';
    super(mergedAttrs);
    if (mergedAttrs.type) {
      this.node.type = mergedAttrs.type;
    }
    if (mergedAttrs.onClick) {
      this.node.addEventListener('click', mergedAttrs.onClick);
    }
  }
}
