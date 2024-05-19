import { IAttributes } from '@components/base-component';
import View from '@views/view';

export default class Error404 extends View {
  constructor() {
    const attrs: IAttributes = {
      classList: ['error'],
      content: 'error 404',
    };
    super(attrs);
  }

  public clearContent(): void {
    document.body.removeChild(this.htmlElement);
  }
}
