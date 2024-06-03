import { ICategoryTreeNode } from '@utils/category-tree';

class CurrentCategory {
  treeNode: ICategoryTreeNode | undefined;

  setCurrentCategory(newCategory?: ICategoryTreeNode) {
    this.treeNode = newCategory;
  }

  get parent() {
    return this.treeNode?.parent;
  }

  get categoryPath() {
    const path: Array<ICategoryTreeNode> = [];
    if (this.treeNode) {
      path.push(this.treeNode);

      if (this.parent) {
        path.push(this.parent);
      }
    }
    path.reverse();
    return path;
  }
}

const currentCategory = new CurrentCategory();

export default currentCategory;
