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
        // filter: 'variants.price.centAmount:range (9000 to 20000)'
        // filter: 'variants.price.centAmount:range (9000 to 15000), (15000 to 18000)'
        // 'filter.query': [
        //   'variants.price.centAmount:range (9000 to 15000)',
        //   'variants.attributes.piece-count:range (1000 to 2000)',
        // ],
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
      // console.log(results);
      // console.log(response.body.facets);
      const products = parseProductProjectionResults(results);
      console.log(Math.min(...products.map((p) => p.price)));
      console.log(Math.max(...products.map((p) => p.price)));
      console.log(Math.min(...products.map((p) => p.discountedPrice)));
      console.log(Math.max(...products.map((p) => p.discountedPrice)));
      // console.log(Math.min(...products.map((p) => p.pieceCount)));
      // console.log(Math.max(...products.map((p) => p.pieceCount)));
      // products.forEach((product) => console.log(`${product.productName}->${product.pieceCount}`));
      sucessCallback(products);
    })
    .catch((error) => {
      errorCallback(error.message);
    });
};

export default getProducts;
