import { BaseComponent, IAttributes } from '@components/base-component';
import { ButtonWithIconComponent } from '@components/button-with-icons';
import createIconControl from '@utils/create-icon-controls';
import View from '@views/view';
import { IInputAttributes, InputComponent } from '@components/input-component';
import { ILabelAttriubutes, LabelComponent } from '@components/label-component';
import styles from './catalog-controls-style.module.scss';

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
    const formWrapper = new BaseComponent({
      classList: ['nav-wrapper', styles.narrowWrapper],
    });
    const form = new BaseComponent({ tag: 'form' });
    const searchContainer = new BaseComponent({
      classList: ['input-field', styles.narrowInput],
    });

    const inputAttrs: IInputAttributes = {
      id: 'search',
      type: 'search',
    };
    this.searchInput = new InputComponent(inputAttrs);
    const labelAttrs: ILabelAttriubutes = {
      classList: 'label-icon',
      for: 'search',
    };
    const label = new LabelComponent(labelAttrs);

    const searchIcon = new BaseComponent({
      classList: ['material-icons', styles.searchButton],
      tag: 'i',
      content: 'search',
    });

    this.appendChild(formWrapper);
    formWrapper.appendChild(form);
    form.appendChild(searchContainer);
    searchContainer.appendChild(this.searchInput);
    searchContainer.appendChild(label);
    label.appendChild(searchIcon);

    form.node.addEventListener('submit', (event) => {
      event.preventDefault();
      applySearch();
    });

    searchIcon.node.onclick = () => {
      applySearch();
    };
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
