import { IAttributes } from '@components/base-component';
import { ButtonWithIconComponent } from '@components/button-with-icons';
import createIconControl from '@utils/create-icon-controls';
import View from '@views/view';
import { InputComponent } from '@components/input-component';
import styles from './catalog-controls-style.module.scss';
import SearchInputView from './search-input';

export default class CatalogControls extends View {
  filterBtn = new ButtonWithIconComponent({});

  sortBtn = new ButtonWithIconComponent({});

  searchInput = new InputComponent({});

  constructor(applySearch: () => void) {
    const attrs: IAttributes = {
      classList: ['card', styles.controlPanel],
    };
    super(attrs);
    this.addSearchString(applySearch);
    this.addFilterButton();
    this.addSortButton();
  }

  addSearchString(applySearch: () => void) {
    const searchString = new SearchInputView(applySearch);
    this.searchInput = searchString.searchInput;
    this.appendChild(searchString);
  }

  addFilterButton() {
    this.filterBtn = createIconControl('filter_list');
    this.filterBtn.node.setAttribute('data-target', 'modal-filter');
    this.filterBtn.addClass('modal-trigger');
    this.appendChild(this.filterBtn);
  }

  addSortButton() {
    this.sortBtn = createIconControl('sort');
    this.sortBtn.node.setAttribute('data-target', 'sort-dropdown');
    this.sortBtn.addClass('dropdown-trigger');
    this.appendChild(this.sortBtn);
  }

  get searchString() {
    const searchString = this.searchInput.value.trim();
    return searchString;
  }
}
