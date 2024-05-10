import { BaseComponent, IAttributes } from './base-component';

export interface ILabelAttriubutes extends IAttributes {
  for?: string;
}

export class LabelComponent extends BaseComponent<HTMLLabelElement> {
  constructor(attrs: ILabelAttriubutes) {
    const mergedAttrs = attrs;
    mergedAttrs.tag = attrs.tag ? attrs.tag : 'label';
    mergedAttrs.classList = attrs.classList ? attrs.classList : 'active';
    super(mergedAttrs);
    if (mergedAttrs.for) {
      this.node.htmlFor = mergedAttrs.for;
    }
  }
}
