import { BaseComponent, IAttributes } from '@components/base-component';
import View from '@views/view';
import getProducts from '@services/products';
import { IProductData } from '@models/products';
import { showErrorMessage } from '@utils/toast-messages';
import SortDropdownView from '@views/catalog/sort-dropdown';
import initMaterializeComponent from '@utils/materilalize-js-init';
import { Dropdown } from 'materialize-css';
import ProductListView from './product-list';
import CatalogControls from './catalog-controls';
import CatalogFiltersView from './catalog-filters-modal';
import ChipsBlockView from './chips-block';
import CategoryDropDown from './category-drop-down';

export default class CatalogPageView extends View {
  private _pageWrapper = new BaseComponent({});

  private _productList = new ProductListView();

  private _controlsBlock = new CatalogControls(() => {});

  private _categoryDropDown = new CategoryDropDown(() => {});

  private _sortDropDown = new SortDropdownView(() => {});

  private _filtersModal = new CatalogFiltersView(() => {});

  private _chipsBlock = new ChipsBlockView();

  constructor() {
    const attrs: IAttributes = {
      classList: 'row',
    };
    super(attrs);
    this.addWrapper();
    this.addControls();
    this.addChipsBlock();
    this.addCategoriesDropDown();
    this.addSortDropDown();
    this.addFiltersModal();
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
    this._controlsBlock = new CatalogControls(
      this.updateProductList.bind(this)
    );
    this._pageWrapper.node.appendChild(this._controlsBlock.htmlElement);
  }

  addChipsBlock() {
    this._chipsBlock = new ChipsBlockView();
    this._pageWrapper.node.appendChild(this._chipsBlock.htmlElement);
  }

  addSortDropDown() {
    this._sortDropDown = new SortDropdownView(
      this.updateProductList.bind(this)
    );
    this.htmlElement.appendChild(this._sortDropDown.htmlElement);
    initMaterializeComponent('#sort-btn', this.htmlElement, () => {
      Dropdown.init(this._controlsBlock.sortBtn.node, {
        constrainWidth: false,
      });
    });
  }

  addCategoriesDropDown() {
    this._categoryDropDown = new CategoryDropDown(
      this.updateProductList.bind(this)
    );
    this.htmlElement.appendChild(this._categoryDropDown.htmlElement);
    initMaterializeComponent('#category-btn', this.htmlElement, () => {
      Dropdown.init(this._controlsBlock.categoryBtn.node, {
        constrainWidth: false,
      });
    });
  }

  addFiltersModal() {
    this._filtersModal = new CatalogFiltersView(
      this.updateProductList.bind(this)
    );
    this.appendChild(this._filtersModal);
  }

  updateProductList() {
    this._productList.removeContent();
    this._chipsBlock.clearChips();
    const { filters } = this._filtersModal;
    const filtersRequest = filters.map((filter) => filter.filter);
    filters.forEach((filter) => this._chipsBlock.addChip(filter.description));
    const { searchString } = this._controlsBlock;

    const { sortBy } = this._sortDropDown;
    getProducts(
      this.setProductList.bind(this),
      showErrorMessage,
      100,
      searchString,
      filtersRequest,
      [sortBy]
    );
  }
}
