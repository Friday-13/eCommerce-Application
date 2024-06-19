import { ProductProjection } from '@commercetools/platform-sdk';
import { IProductData } from '@models/products';
import ApiRoot from './api-root';
import { createProductData } from './product-data';

function parseProductProjectionResults(
  results: Array<ProductProjection>
): Array<IProductData> {
  const products = results.map((result) => {
    const product = createProductData(result.id, result);
    return product;
  });
  return products;
}

const getProducts = (
  sucessCallback: (products: Array<IProductData>, total?: number) => void,
  errorCallback: (message: string) => void,
  limit: number = 100,
  offset: number = 0,
  searchString?: string,
  filterQuery: Array<string> = [],
  sort: Array<string> = []
) => {
  ApiRoot.root
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit,
        'filter.query': filterQuery,
        sort,
        'text.en-gb': searchString,
        fuzzy: true,
        offset,
      },
    })
    .execute()
    .then((response) => {
      const { results } = response.body;
      const products = parseProductProjectionResults(results);
      const { total } = response.body;
      sucessCallback(products, total);
    })
    .catch((error) => {
      errorCallback(error.message);
    });
};

export default getProducts;
