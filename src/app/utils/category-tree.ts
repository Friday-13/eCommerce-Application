import { ICategory } from '@models/category';

function createNode(category: ICategory, parent?: ICategoryTreeNode) {
  const newNode: ICategoryTreeNode = {
    name: category.name,
    id: category.id,
    parentId: category.parentId,
    children: [],
    parent,
  };
  return newNode;
}

export interface ICategoryTreeNode extends ICategory {
  children: Array<ICategoryTreeNode>;
  parent?: ICategoryTreeNode;
}

export class CategoryTree {
  rootCategories: Array<ICategoryTreeNode> = [];

  constructor(categories: Array<ICategory>) {
    this.createRootCategories(categories);
    this.createChildCategories(categories);
  }

  createRootCategories(categories: Array<ICategory>) {
    categories.forEach((category) => {
      if (!category.parentId) {
        this.rootCategories.push(createNode(category));
      }
    });
  }

  createChildCategories(categories: Array<ICategory>) {
    categories.forEach((category) => {
      if (category.parentId) {
        const parent = this.rootCategories.find(
          (node) => node.id === category.parentId
        );
        if (parent) {
          const childNode = createNode(category, parent);
          parent.children.push(childNode);
        }
      }
    });
  }
}
