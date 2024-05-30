import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';
import getProducts from '@services/products';
import { IProductData } from '@models/products';
import { showErrorMessage } from '@utils/toast-messages';
import ProductListView from './product-list';
import CatalogControls from './catalog-controls';

export default class CatalogPageView extends View {
  private _pageWrapper = new BaseComponent({});

  private _productList = new ProductListView();

  constructor() {
    const attrs: IAttributes = {
      classList: 'row',
    };
    super(attrs);
    this.addWrapper();
    this.addControls();
    this.addProductList();
  }

  addWrapper() {
    const attrs: IAttributes = {
      classList: ['col', 's12', 'm10', 'offset-m1'],
    };
    this._pageWrapper = new BaseComponent(attrs);
    this.appendChild(this._pageWrapper);
  }

  addProductList() {
    getProducts(this.setProductList.bind(this), showErrorMessage);
    this._productList = new ProductListView();
    this._pageWrapper.node.appendChild(this._productList.htmlElement);
  }

  get productList() {
    return this._productList;
  }

  setProductList(products: Array<IProductData>) {
    this._productList.setProducts(products);
  }

  addControls() {
    const controlsBlock = new CatalogControls();
    this._pageWrapper.node.appendChild(controlsBlock.htmlElement);
  }
}
