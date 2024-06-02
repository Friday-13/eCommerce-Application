import { parseCategoryQuery } from '@models/category';
import apiRoot from './api-root';

const getCategories = (
  sucessCallback: () => void,
  errorCallback: (message: string) => void
) => {
  apiRoot
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
      console.log(categories);
      sucessCallback();
    })
    .catch((error) => {
      errorCallback(error.message);
    });
};

export default getCategories;
