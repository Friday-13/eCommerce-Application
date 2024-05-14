import View from '@views/view';
import { IAttributes } from '@components/base-component';

export default class MainView extends View {
  constructor() {
    const attrs: IAttributes = {
      tag: 'div',
      classList: ['main-container'],
    };
    super(attrs);
  }
}
