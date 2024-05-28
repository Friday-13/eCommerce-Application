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

export interface AttributeProducts {
  name: string;
  value: string | number;
}

interface LocalizedString {
  [key: string]: string;
}

export interface Current {
  name: LocalizedString;
  description?: LocalizedString;
  masterVariant: {
    images?: { url: string }[];
    prices?: {
      value: { centAmount: number };
      discounted?: { value: { centAmount: number } };
    }[];
    attributes?: { name: string; value: string | number }[];
  };
}
