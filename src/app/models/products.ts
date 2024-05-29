export interface IProductData {
  productName: string;
  description: string;
  price: number | null;
  discountedPrice: number | null;
  imageUrls: string[];
  ageRange: string;
  pieceCount: number;
  theme: string;
}

export interface IAttributeProducts {
  name: string;
  value: string | number;
}

interface ILocalizedString {
  [key: string]: string;
}

export interface ICurrent {
  name: ILocalizedString;
  description?: ILocalizedString;
  masterVariant: {
    images?: { url: string }[];
    prices?: {
      value: { centAmount: number };
      discounted?: { value: { centAmount: number } };
    }[];
    attributes?: { name: string; value: string | number }[];
  };
}
