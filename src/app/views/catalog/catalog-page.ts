import { IAttributes } from '@components/base-component';
import View from '@views/view';

export default class CatalogPageView extends View {
  constructor() {
    const attrs: IAttributes = {
      content: 'Catalog page',
    };
    super(attrs);
  }
}
