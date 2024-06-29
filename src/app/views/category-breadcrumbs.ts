import { BaseComponent, IAttributes } from '@components/base-component';
import { AnchorComponent, IAnchorAttrs } from '@components/anchor-component';
import { ICategoryTreeNode } from '@utils/category-tree';
import View from './view';
import styles from './catalog/catalog-controls-style.module.scss';
import currentCategory from './catalog/current-category';

export default class CategoryBreadCrumbsView extends View {
  _breadCrumbsContainer = new BaseComponent({});

  protected _crumbClick: () => void;

  constructor(crumbClick: () => void) {
    const attrs: IAttributes = {
      tag: 'nav',
      classList: styles.breadcrumbNav,
    };
    super(attrs);
    this.addBreadCrumbsContainer();
    this.addStartBreadCrumb();
    this._crumbClick = crumbClick;
  }

  addBreadCrumbsContainer() {
    const attrs: IAttributes = {
      classList: 'col s12',
    };
    this._breadCrumbsContainer = new BaseComponent(attrs);
    this.appendChild(this._breadCrumbsContainer);
  }

  addBreadCrumb(text: string, onClick: () => void) {
    const attrs: IAnchorAttrs = {
      classList: ['breadcrumb', styles.breadcrumbBlack],
      content: text,
      onClick,
    };

    const crumb = new AnchorComponent(attrs);
    this._breadCrumbsContainer.appendChild(crumb);
  }

  addStartBreadCrumb() {
    this.addBreadCrumb('Catalog', () => {
      currentCategory.setCurrentCategory(undefined);
      this._crumbClick();
    });
  }

  clear() {
    this._breadCrumbsContainer.textContent = '';
    this.addStartBreadCrumb();
  }

  generateFromPath(path: Array<ICategoryTreeNode>) {
    path.forEach((category) => {
      this.addBreadCrumb(category.name, () => {
        currentCategory.setCurrentCategory(category);
        this._crumbClick();
      });
    });
  }
}
