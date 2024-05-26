import apiRoot from './api-root';

export interface ProductData {
  productName: string;
  description: string;
  price: number | null;
  discountedPrice: number | null;
  imageUrls: string[];
  ageRange: string;
  pieceCount: number;
  theme: string;
}

export const getProductById = (
  productId: string,
  successCallback: (productData: ProductData) => void,
  errorCallback: (message: string) => void
): void => {
  apiRoot
    .products()
    .withId({ ID: productId })
    .get()
    .execute()
    .then((response) => {
      const product = response.body.masterData.current;
      const productName = product.name['en-GB'];
      const description = product.description
        ? product.description['en-GB']
        : '';
      const { prices } = product.masterVariant;
      const price =
        prices && prices[0] ? prices[0].value.centAmount / 100 : null;
      const discountedPrice =
        prices && prices[0] && prices[0].discounted
          ? prices[0].discounted.value.centAmount / 100
          : null;
      const imageUrls =
        product.masterVariant.images?.map((image) => image.url) || [];
      const ageRange =
        product.masterVariant.attributes?.find(
          (attr) => attr.name === 'age-range'
        )?.value || 'Не указано';

      const pieceCount =
        product.masterVariant.attributes?.find(
          (attr) => attr.name === 'piece-count'
        )?.value || 0;
      const theme =
        product.masterVariant.attributes?.find((attr) => attr.name === 'theme')
          ?.value || 'Не указано';

      const productData: ProductData = {
        productName,
        description,
        price,
        discountedPrice,
        imageUrls,
        ageRange: ageRange || 'Не указано',
        pieceCount: pieceCount || 0,
        theme: theme || 'Не указано',
      };
      successCallback(productData);
    })
    .catch((reason) => {
      errorCallback(reason.body.message);
    });
};
