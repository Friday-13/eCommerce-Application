import { BaseComponent, IAttributes } from '@components/base-component';

export interface IOptionAttributes extends IAttributes {
  value?: string;
  disable?: boolean;
  selected?: boolean;
}

export class OptionComponent extends BaseComponent<HTMLOptionElement> {
  constructor(attrs: IOptionAttributes) {
    const mergedAttrs = attrs;
    mergedAttrs.tag = attrs.tag ? attrs.tag : 'option';
    super(mergedAttrs);
    this.value = mergedAttrs.value ? mergedAttrs.value : '';
    this.disable =
      mergedAttrs.disable !== undefined ? mergedAttrs.disable : false;
    this.selected =
      mergedAttrs.selected !== undefined ? mergedAttrs.selected : false;
  }

  set value(newValue: string) {
    this.node.value = newValue;
  }

  get value() {
    return this.node.value;
  }

  set selected(isSelected: boolean) {
    this.node.defaultSelected = isSelected;
  }

  get selected() {
    return this.node.selected;
  }

  set disable(isDisable: boolean) {
    this.node.disabled = isDisable;
  }

  get disable() {
    return this.node.disabled;
  }
}
