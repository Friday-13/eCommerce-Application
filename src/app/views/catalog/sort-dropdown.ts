import { BaseComponent, IAttributes } from '@components/base-component';
import {
  AnchorWithIconComponent,
  IAnchorWithIconAttributes,
} from '@components/anchor-with-icon';
import View from '@views/view';
import styles from './catalog-controls-style.module.scss';

type TSortDirection = 'asc' | 'desc';

export default class SortDropdownView extends View {
  private _applyCallback: () => void;

  private _currentSort: string = '';

  private _options: Array<BaseComponent> = [];

  constructor(applyCallback: () => void) {
    const attrs: IAttributes = {
      tag: 'ul',
      classList: 'dropdown-content',
      id: 'sort-dropdown',
    };
    super(attrs);
    this._applyCallback = applyCallback;
    this.addSortOptions();
  }

  addSortOptions() {
    this.createSortOption(
      'Product Name',
      this.sortByName.bind(this, 'asc'),
      'arrow_downward'
    );
    this.createSortOption(
      'Product Name',
      this.sortByName.bind(this, 'desc'),
      'arrow_upward'
    );
    this.createDivider();
    this.createSortOption(
      'Product Price',
      this.sortByPrice.bind(this, 'asc'),
      'arrow_downward'
    );
    this.createSortOption(
      'Product Price',
      this.sortByPrice.bind(this, 'desc'),
      'arrow_upward'
    );
  }

  createSortOption(text: string, onClick: () => void, icon?: string) {
    const optionAttrs: IAttributes = {
      tag: 'li',
    };
    const option = new BaseComponent(optionAttrs);
    const optionContentAttrs: IAnchorWithIconAttributes = {
      onClick: () => {
        this.selectOption(option);
        onClick();
        this._applyCallback();
      },
      content: text,
      icon,
    };
    const optionContent = new AnchorWithIconComponent(optionContentAttrs);
    option.appendChild(optionContent);
    this.appendChild(option);
    this._options.push(option);
  }

  createDivider() {
    const dividerAttrs: IAttributes = {
      tag: 'li',
      classList: 'divider',
    };
    const divider = new BaseComponent(dividerAttrs);
    divider.node.setAttribute('tabindex', '-1');
    this.appendChild(divider);
  }

  sortByName(direction: TSortDirection) {
    this.currentSort = `name.en-gb ${direction}`;
  }

  sortByPrice(direction: TSortDirection) {
    this.currentSort = `price ${direction}`;
  }

  get sortBy() {
    return this._currentSort;
  }

  set currentSort(sort: string) {
    if (this._currentSort === sort) {
      this._currentSort = '';
      return;
    }
    this._currentSort = sort;
  }

  clearSortingOptions() {
    this._options.forEach((option) =>
      option.removeClass(styles.activeSortOption)
    );
  }

  selectOption(option: BaseComponent) {
    if (option.node.classList.contains(styles.activeSortOption)) {
      option.removeClass(styles.activeSortOption);
    } else {
      this.clearSortingOptions();
      option.addClass(styles.activeSortOption);
    }
  }
}
