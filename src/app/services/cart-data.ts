import { Cart } from '@commercetools/platform-sdk';
import { ICartData, ILineItem, IVariant } from '@models/cart';
import ApiRoot from './api-root';

export const createCartData = (cart: Cart): ICartData => {
  const createdBy = {
    anonymousId: cart.createdBy?.anonymousId || '',
    // Другие поля, если они есть
  };

  const lineItems: ILineItem[] = cart.lineItems.map((item) => {
    // Получаем только первое изображение из массива images
    const firstImageUrl =
      item.variant && item.variant.images && item.variant.images.length > 0
        ? item.variant.images[0].url
        : '';

    const variant: IVariant = {
      id: item.variant.id,
      sku: item.variant ? item.variant.sku : '',
      prices:
        item.variant && item.variant.prices
          ? item.variant.prices.map((price) => ({
              value: {
                currencyCode: price.value.currencyCode,
                centAmount: price.value.centAmount,
                fractionDigits: price.value.fractionDigits,
              },
              discounted: price.discounted
                ? {
                    value: {
                      currencyCode: price.discounted.value.currencyCode,
                      centAmount: price.discounted.value.centAmount,
                      fractionDigits: price.discounted.value.fractionDigits,
                    },
                  }
                : null, // Если нет скидочной цены, возвращаем null
            }))
          : [],
      // Используем только первое изображение
      images: [
        {
          url: firstImageUrl,
        },
      ],
    };

    return {
      id: item.id,
      productId: item.productId,
      name: item.name['en-GB'],
      variant,
      price: {
        value: {
          currencyCode: item.price.value.currencyCode,
          centAmount: item.price.value.centAmount,
          fractionDigits: item.price.value.fractionDigits,
        },
      },
      quantity: item.quantity,
      totalPrice: {
        currencyCode: item.totalPrice.currencyCode,
        centAmount: item.totalPrice.centAmount,
        fractionDigits: item.totalPrice.fractionDigits,
      },
      discountedPricePerQuantity: item.discountedPricePerQuantity.map(
        (discount) => ({
          quantity: discount.quantity,
          discountedPrice: {
            value: {
              currencyCode: discount.discountedPrice.value.currencyCode,
              centAmount: discount.discountedPrice.value.centAmount,
              fractionDigits: discount.discountedPrice.value.fractionDigits,
            },
          },
        })
      ),
    };
  });

  const cartData: ICartData = {
    id: cart.id,
    version: cart.version,
    createdBy,
    lineItems,
    totalPrice: {
      currencyCode: cart.totalPrice.currencyCode,
      centAmount: cart.totalPrice.centAmount,
      fractionDigits: cart.totalPrice.fractionDigits,
    },
    cartState: 'Active',
    discountCodes: [],
    totalLineItemQuantity: cart.totalLineItemQuantity,
  };

  return cartData;
};

export const getCartById = (
  cartId: string,
  successCallback: (cartData: Cart) => void,
  errorCallback: (message: string) => void
): void => {
  ApiRoot.root
    .carts()
    .withId({ ID: cartId })
    .get()
    .execute()
    .then(({ body }) => {
      successCallback(body);
    })
    .catch((error) => {
      errorCallback(`Failed to load cart: ${error.message}`);
    });
};

// проверяет наличие товара в корзине, возвращает true  или false
export const getsProductInCartId = (
  cartData: ICartData,
  productId: string
): boolean => {
  return cartData.lineItems.some(
    (lineItem) => lineItem.productId === productId
  );
};
