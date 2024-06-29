import { ICategory, parseCategoryQuery } from '@models/category';
import apiRoot from './api-root';

const getCategories = (
  sucessCallback: (categories: Array<ICategory>) => void,
  errorCallback: (message: string) => void
) => {
  apiRoot.root
    .categories()
    .get({
      queryArgs: {
        limit: 100,
        sort: 'parent.id asc',
      },
    })
    .execute()
    .then((response) => {
      const { results } = response.body;
      const categories = parseCategoryQuery(results);
      sucessCallback(categories);
    })
    .catch((error) => {
      errorCallback(error.message);
    });
};

export default getCategories;
