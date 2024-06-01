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
  limit: number = 30,
  filterQuery: Array<string> = []
) => {
  apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit,
        'filter.query': filterQuery,
        sort: [
          // 'name.en-gb asc',
          // 'price asc',
          'price desc',
          // 'variants.attributes.piece-count asc'
        ],
        // facet: 'variants.price.centAmount:range (0 to 100000)',
        // facet: 'variants.attributes.piece-count:range (0 to 100000)',
      },
    })
    .execute()
    .then((response) => {
      const { results } = response.body;
      const products = parseProductProjectionResults(results);
      sucessCallback(products);
    })
    .catch((error) => {
      errorCallback(error.message);
    });
};

export default getProducts;
