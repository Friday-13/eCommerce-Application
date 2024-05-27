import { ProductData, AttributeProducts } from '@models/products';
import apiRoot from './api-root';

// Функция для извлечения значения атрибута из списка атрибутов
const attributeValue = (
  attributes: AttributeProducts[],
  attrName: string
): string | number => {
  const attribute = attributes.find((attr) => attr.name === attrName);
  return attribute ? attribute.value : 'Не указано';
};

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
    .then(
      ({
        body: {
          masterData: { current },
        },
      }) => {
        const { name, description, masterVariant } = current;
        const productName = name['en-GB'];
        const productDescription = description?.['en-GB'] || '';
        const images = masterVariant.images?.map((image) => image.url) || [];
        const { prices, attributes } = masterVariant;

        const price =
          prices && prices[0] ? prices[0].value.centAmount / 100 : null;
        const discountedPrice =
          prices && prices[0]?.discounted
            ? prices[0].discounted.value.centAmount / 100
            : null;

        const productData: ProductData = {
          productName,
          description: productDescription,
          price,
          discountedPrice,
          imageUrls: images,
          ageRange: attributeValue(attributes || [], 'age-range').toString(),
          pieceCount: Number(attributeValue(attributes || [], 'piece-count')),
          theme: attributeValue(attributes || [], 'theme').toString(),
        };

        successCallback(productData);
      }
    )
    .catch(({ body }) => {
      errorCallback(body.message);
    });
};

export default getProductById;
