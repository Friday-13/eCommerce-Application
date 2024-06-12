import { ProductProjection } from '@commercetools/platform-sdk';
import { IProductData } from '@models/products';
import apiRoot from './api-root';
import { createProductData } from './product-data';

function parseProductProjectionResults(
  results: Array<ProductProjection>
): Array<IProductData> {
  const products = results.map((result) => {
    const product = createProductData(result);
    return product;
  });
  return products;
}

const getProducts = (
  sucessCallback: (products: Array<IProductData>) => void,
  errorCallback: (message: string) => void,
  limit: number = 100,
  searchString?: string,
  filterQuery: Array<string> = [],
  sort: Array<string> = []
) => {
  console.log(limit);
  apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit,
        'filter.query': filterQuery,
        sort,
        'text.en-gb': searchString,
        fuzzy: true,
      },
    })
    .execute()
    .then((response) => {
      const { results } = response.body;
      const products = parseProductProjectionResults(results);
      sucessCallback(products);
      console.log(response);
    })
    .catch((error) => {
      errorCallback(error.message);
    });
};

export default getProducts;
