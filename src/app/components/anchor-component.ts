import { BaseComponent, IAttributes } from './base-component';

export interface IAnchorAttrs extends IAttributes {
  href?: string;
  target?: string;
}
export class AnchorComponent extends BaseComponent<HTMLAnchorElement> {
  constructor(attrs: IAnchorAttrs) {
    const mergedAttrs = attrs;
    mergedAttrs.tag = attrs.tag ? attrs.tag : 'a';
    super(attrs);
    if (mergedAttrs.href) {
      this.node.href = mergedAttrs.href;
    }
    if (mergedAttrs.target) {
      this.node.target = mergedAttrs.target;
    }
  }
}
