import { ICategory } from '@models/category';

export interface ICategoryTreeNode extends ICategory {
  children: Array<ICategoryTreeNode>;
}

export class CategoryTree {
  rootCategories: Array<ICategoryTreeNode> = [];

  constructor(categories: Array<ICategory>) {
    categories.forEach((category) => {
      const categoryNode = CategoryTree.createNode(category);
      if (categoryNode.parentId === undefined) {
        this.rootCategories.push(categoryNode);
      } else {
        const parrent = this.rootCategories.find(
          (rootNode) => rootNode.id === categoryNode.parentId
        );
        parrent?.children.push(categoryNode);
      }
    });
  }

  static createNode(category: ICategory) {
    const newNode: ICategoryTreeNode = {
      name: category.name,
      id: category.id,
      parentId: category.parentId,
      children: [],
    };
    return newNode;
  }
}
