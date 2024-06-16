import { AnchorComponent } from '@components/anchor-component';
import { IAttributes } from '@components/base-component';
import View from '@views/view';

export default class PaginationButtonView extends View {
  private _anchor = new AnchorComponent({});

  constructor(value: string, onClick: () => void, isActive?: boolean) {
    const attrs: IAttributes = {
      tag: 'li',
      classList: ['waves-effect', 'active'],
    };
    super(attrs);
    this._anchor = new AnchorComponent({});
    this.appendChild(this._anchor);
    this.value = value;
    this.active = Boolean(isActive);
    this.htmlElement.onclick = onClick;
  }

  set value(newValue: string) {
    this._anchor.textContent = newValue;
  }

  get value() {
    return this._anchor.textContent;
  }

  set active(isActive: boolean) {
    if (isActive) {
      this.htmlElement.classList.add('active');
    } else {
      this.htmlElement.classList.remove('active');
    }
  }

  get active() {
    return this.htmlElement.classList.contains('active');
  }

  inactivate() {
    this.active = false;
  }
}
