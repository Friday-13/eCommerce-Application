import { IAttributes } from '@components/base-component';
import View from '@views/view';

export default class BasketProductView extends View {
  constructor() {
    const attrs: IAttributes = {
      classList: 'card',
      content: "I'm a product in basket",
    };
    super(attrs);
  }
}
