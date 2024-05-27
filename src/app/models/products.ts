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

export interface Current {
  name: { 'en-GB': string };
  description?: { 'en-GB': string };
  masterVariant: {
    images: { url: string }[];
    prices: {
      value: { centAmount: number };
      discounted?: { value: { centAmount: number } };
    }[];
    attributes: { name: string; value: string | number }[];
  };
}
