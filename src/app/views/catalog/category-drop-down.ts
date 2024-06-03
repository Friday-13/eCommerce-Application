import DropdownView from '@utils/drop-down-view';
import { ICategory } from '@models/category';
import { CategoryTree, ICategoryTreeNode } from '@utils/category-tree';
import styles from './catalog-controls-style.module.scss';
import currentCategory from './current-category';

export default class CategorDropDown extends DropdownView {
  _tree = new CategoryTree([]);

  constructor(applyCallback: () => void) {
    super('category-dropdown', applyCallback);
  }

  createSubOption(text: string, onClick: () => void, icon?: string) {
    this.createOption(text, onClick, icon);
    this._options[this._options.length - 1].addClass(styles.subCategory);
  }

  setCategories(categories: Array<ICategory>) {
    this._tree = new CategoryTree(categories);
    this._tree.rootCategories.forEach((category) => {
      this.createOption(category.name, () => {
        currentCategory.setCurrentCategory(category);
      });
      this.setSubCategories(category);
    });
  }

  setSubCategories(rootCategory: ICategoryTreeNode) {
    rootCategory.children.forEach((subCategory) => {
      this.createSubOption(subCategory.name, () => {
        currentCategory.setCurrentCategory(subCategory);
      });
    });
  }
}
