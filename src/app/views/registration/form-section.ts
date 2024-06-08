import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';

export default class FormSectionView extends View {
  constructor(title?: string) {
    const attrs: IAttributes = {
      classList: 'row col s12',
    };
    super(attrs);
    if (title) {
      this.addTitle(title);
    }
  }

  addTitle(title: string) {
    const attrs: IAttributes = {
      tag: 'h5',
      content: title,
    };
    const titleComponent = new BaseComponent(attrs);
    this.appendChild(titleComponent);
  }
}
