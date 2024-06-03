import { BaseComponent } from '@components/base-component';
import DropdownView from '@utils/drop-down-view';
import styles from './catalog-controls-style.module.scss';

type TSortDirection = 'asc' | 'desc';

export default class SortDropdownView extends DropdownView {
  private _currentSort: string = '';

  constructor(applyCallback: () => void) {
    super('sort-dropdown', applyCallback);
    this.addSortOptions();
  }

  addSortOptions() {
    this.createOption(
      'Product Name',
      this.sortByName.bind(this, 'asc'),
      'arrow_downward'
    );
    this.createOption(
      'Product Name',
      this.sortByName.bind(this, 'desc'),
      'arrow_upward'
    );
    this.createDivider();
    this.createOption(
      'Product Price',
      this.sortByPrice.bind(this, 'asc'),
      'arrow_downward'
    );
    this.createOption(
      'Product Price',
      this.sortByPrice.bind(this, 'desc'),
      'arrow_upward'
    );
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
    super.selectOption(option);
    if (option.node.classList.contains(styles.activeSortOption)) {
      option.removeClass(styles.activeSortOption);
    } else {
      this.clearSortingOptions();
      option.addClass(styles.activeSortOption);
    }
  }
}
