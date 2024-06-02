import { Category } from '@commercetools/platform-sdk';

export interface ICategory {
  id: string;
  name: string;
  parentId?: string;
}

export function parseCategory(category: Category) {
  const parsedCategoty: ICategory = {
    id: category.id,
    name: category.name['en-GB'],
    parentId: category.parent?.id,
  };
  return parsedCategoty;
}

export function parseCategoryQuery(categories: Array<Category>) {
  return categories.map((category) => parseCategory(category));
}
