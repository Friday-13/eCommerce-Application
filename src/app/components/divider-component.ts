import { BaseComponent, IAttributes } from './base-component';

class DividerComponent extends BaseComponent {
  constructor() {
    const attrs: IAttributes = {
      classList: 'divider',
    };
    super(attrs);
  }
}

export default DividerComponent;
