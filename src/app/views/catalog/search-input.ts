import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';
import { IInputAttributes, InputComponent } from '@components/input-component';
import { ILabelAttriubutes, LabelComponent } from '@components/label-component';
import styles from './catalog-controls-style.module.scss';

export default class SearchInputView extends View {
  searchInput = new InputComponent({});

  private _applySearch: () => void;

  private _searchBtn = new BaseComponent();

  private _clearBtn = new BaseComponent();

  constructor(applySearch: () => void) {
    const attrs: IAttributes = {
      classList: ['nav-wrapper', styles.narrowWrapper],
    };
    super(attrs);
    this._applySearch = applySearch;
    this.addForm(applySearch);
  }

  addForm(applySearch: () => void) {
    const form = new BaseComponent({ tag: 'form' });

    const searchContainer = new BaseComponent({
      classList: ['input-field', styles.narrowInput],
    });

    const labelAttrs: ILabelAttriubutes = {
      classList: 'label-icon',
      for: 'search',
    };
    const label = new LabelComponent(labelAttrs);

    this.configSearchInput();
    this.configSearchBtn();
    this.configClearBtn();

    this.appendChild(form);
    form.appendChild(searchContainer);
    searchContainer.appendChild(this.searchInput);
    searchContainer.appendChild(label);
    label.appendChild(this._searchBtn);
    searchContainer.appendChild(this._clearBtn);

    form.node.addEventListener('submit', (event) => {
      event.preventDefault();
      applySearch();
    });
  }

  configSearchInput() {
    const inputAttrs: IInputAttributes = {
      id: 'search',
      type: 'search',
    };
    this.searchInput = new InputComponent(inputAttrs);
  }

  configSearchBtn() {
    this._searchBtn = new BaseComponent({
      classList: ['material-icons', styles.searchButton],
      tag: 'i',
      content: 'search',
    });
    this._searchBtn.node.onclick = () => {
      this._applySearch();
    };
  }

  configClearBtn() {
    this._clearBtn = new BaseComponent({
      classList: ['material-icons'],
      tag: 'i',
      content: 'close',
    });
    this._clearBtn.node.onclick = () => {
      this.searchInput.clear();
      this._applySearch();
    };
  }
}
