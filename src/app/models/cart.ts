import { ILocalizedString } from './products';

// Интерфейсы для структуры данных корзины
export interface ICartData {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  customerId?: string;
  customerEmail?: string;
  anonymousId?: string;
  lineItems: ILineItem[];
  totalLineItemQuantity?: number;
  totalPrice: IPrice;
  cartState: 'Active' | 'Merged' | 'Ordered';
  discountCodes: IDiscountCode[];
  discountOnTotalPrice?: IDiscountOnTotalPrice;
}

export interface ILineItem {
  id: string;
  productId: string;
  name: ILocalizedString;
  variant: IVariant;
  price: IPrice;
  quantity: number;
  totalPrice: IMoney;
  discountedPricePerQuantity: IDiscountedLineItemPriceForQuantity[];
}

interface IVariant {
  id: number;
  sku: string;
  prices: IPrice[];
  images: { url: string }[];
}

export interface IPrice {
  value: IMoney;
}

export interface IMoney {
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface IDiscountedLineItemPriceForQuantity {
  quantity: number;
  discountedPrice: {
    value: IMoney;
  };
}

interface IDiscountCode {
  id: string;
  code: string;
}

interface IDiscountOnTotalPrice {
  discount: IPrice;
  discountedAmount: IPrice;
}
