import { IAttributes } from '@components/base-component';
import { ButtonWithIconComponent } from '@components/button-with-icons';
import createIconControl from '@utils/create-icon-controls';
import View from '@views/view';
import styles from './catalog-controls-style.module.scss';

export default class CatalogControls extends View {
  private _filterBtn = new ButtonWithIconComponent({});

  private _sortBtn = new ButtonWithIconComponent({});

  constructor() {
    const attrs: IAttributes = {
      classList: ['card', styles.controlPanel],
    };
    super(attrs);
    this.addFilterButton();
    this.addSortButton();
  }

  addFilterButton() {
    this._filterBtn = createIconControl('filter_list');
    this.appendChild(this._filterBtn);
  }

  addSortButton() {
    this._sortBtn = createIconControl('sort');
    this.appendChild(this._sortBtn);
  }
}
