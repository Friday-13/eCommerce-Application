import { BaseComponent, IAttributes } from './base-component';

export interface IImageAttributes extends IAttributes {
  src?: string;
  alt?: string;
}

export class ImageComponent extends BaseComponent<HTMLImageElement> {
  constructor(attrs: IImageAttributes) {
    const mergedAttrs = attrs;
    mergedAttrs.tag = attrs.tag ? attrs.tag : 'img';
    if (!mergedAttrs.tag) {
      mergedAttrs.tag = 'img';
    }
    super(mergedAttrs);
    if (mergedAttrs.src) {
      this.node.src = mergedAttrs.src;
    }

    if (mergedAttrs.alt) {
      this.node.alt = mergedAttrs.alt;
    }
  }
}
