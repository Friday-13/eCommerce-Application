import { IAttributes } from '@components/base-component';
import { ButtonWithIconComponent } from '@components/button-with-icons';
import createIconControl from '@utils/create-icon-controls';
import View from '@views/view';
import styles from './catalog-controls-style.module.scss';

export default class CatalogControls extends View {
  filterBtn = new ButtonWithIconComponent({});

  sortBtn = new ButtonWithIconComponent({});

  constructor() {
    const attrs: IAttributes = {
      classList: ['card', styles.controlPanel],
    };
    super(attrs);
    this.addFilterButton();
    this.addSortButton();
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
}
