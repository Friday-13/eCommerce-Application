export interface ICartData {
  id: string;
  version: number;
  createdBy: {
    anonymousId: string;
  };
  customerId?: string;
  customerEmail?: string;
  anonymousId?: string;
  lineItems: ILineItem[];
  totalLineItemQuantity?: number;
  totalPrice: ITotalPrice;
  cartState: 'Active' | 'Merged' | 'Ordered';
  discountCodes: IDiscountCode[];
  discountOnTotalPrice?: IDiscountOnTotalPrice;
}

export interface ILineItem {
  id: string;
  productId: string;
  name: string;
  variant: IVariant;
  price: IPrice;
  quantity: number;
  totalPrice: IMoney;
  discountedPricePerQuantity: IDiscountedLineItemPriceForQuantity[];
}

export interface IVariant {
  id: number;
  sku?: string;
  prices: IPrice[];
  images: { url: string }[];
}

export interface IPrice {
  value: IMoney;
  discounted?: IDiscounted;
}

export interface IMoney {
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface IDiscounted {
  value: IMoney;
}

export interface ITotalPrice {
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
