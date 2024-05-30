import { BaseComponent, IAttributes } from '@components/base-component';

export default function createPriceComponent(
  price: number,
  textColor?: string,
  decoration?: string
) {
  const attrs: IAttributes = {
    classList: ['text-darken-3'],
    content: `$ ${price}`,
  };

  const priceComponent = new BaseComponent(attrs);
  if (textColor) {
    priceComponent.addClass(textColor);
  }
  if (decoration) {
    priceComponent.addClass(decoration);
  }
  return priceComponent;
}
