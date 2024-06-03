import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';

export default class ChipsBlockView extends View {
  constructor() {
    const attrs: IAttributes = {
      classList: 'col s12',
    };
    super(attrs);
  }

  addChip(chipText: string) {
    const chip = new BaseComponent({ classList: 'chip' });
    this.appendChild(chip);
    chip.textContent = chipText;
  }

  clearChips() {
    this.removeContent();
  }
}
