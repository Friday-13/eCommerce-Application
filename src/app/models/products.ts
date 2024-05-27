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
