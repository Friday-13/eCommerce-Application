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
  limit: number = 30
) => {
  apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit,
        // filter: 'variants.price.centAmount:range (9000 to 20000)'
      },
    })
    .execute()
    .then((response) => {
      const { results } = response.body;
      console.log(results);
      const products = parseProductProjectionResults(results);
      sucessCallback(products);
    })
    .catch((error) => {
      errorCallback(error.message);
    });
};

export default getProducts;
