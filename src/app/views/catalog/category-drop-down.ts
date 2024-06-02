import DropdownView from '@utils/drop-down-view';
import { ICategory } from '@models/category';
import { CategoryTree, ICategoryTreeNode } from '@utils/category-tree';
import styles from './catalog-controls-style.module.scss';

export default class CategorDropDown extends DropdownView {
  currentCategory?: ICategoryTreeNode;

  constructor(applyCallback: () => void) {
    super('category-dropdown', applyCallback);
  }

  createSubOption(text: string, onClick: () => void, icon?: string) {
    this.createOption(text, onClick, icon);
    this._options[this._options.length - 1].addClass(styles.subCategory);
  }

  setCategories(categories: Array<ICategory>) {
    const tree = new CategoryTree(categories);
    tree.rootCategories.forEach((category) => {
      this.createOption(category.name, () => {
        this.selectCategory(category);
      });
      this.setSubCategories(category);
    });
  }

  setSubCategories(rootCategory: ICategoryTreeNode) {
    rootCategory.children.forEach((subcategory) => {
      this.createSubOption(subcategory.name, () => {
        this.selectCategory(subcategory);
      });
    });
  }

  selectCategory(category: ICategoryTreeNode) {
    this.currentCategory = category;
  }
}
