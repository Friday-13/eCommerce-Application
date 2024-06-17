import getProducts from '@services/products';
import { IProductData } from '@models/products';
import { showErrorMessage } from '@utils/toast-messages';
import SortDropdownView from '@views/catalog/sort-dropdown';
import initMaterializeComponent from '@utils/materilalize-js-init';
import { Dropdown } from 'materialize-css';
import getCategories from '@services/categories';
import { categoryFilter } from '@utils/query-args';
import CategoryBreadCrumbsView from '@views/category-breadcrumbs';
import PageView from '@views/page-view';
import PaginationView from '@views/pagination/pagination-view';
import ProductListView from './product-list';
import CatalogControls from './catalog-controls';
import CatalogFiltersView from './catalog-filters-modal';
import ChipsBlockView from './chips-block';
import CategoryDropDown from './category-drop-down';
import currentCategory from './current-category';

const PRODUCT_PER_PAGE = 3;

export default class CatalogPageView extends PageView {
  private _productList = new ProductListView();

  private _breadCrumbs = new CategoryBreadCrumbsView(() => {});

  private _controlsBlock = new CatalogControls(() => {});

  private _categoryDropDown = new CategoryDropDown(() => {});

  private _sortDropDown = new SortDropdownView(() => {});

  private _filtersModal = new CatalogFiltersView(() => {});

  private _chipsBlock = new ChipsBlockView();

  private _paginationBlock = new PaginationView(this.updateProductList);

  constructor() {
    super();
    this.addBreadCrumbs();
    this.addControls();
    this.addChipsBlock();
    this.addCategoriesDropDown();
    this.addSortDropDown();
    this.addFiltersModal();
    this.addProductList();
    this.addCategoryList();
    this.addPagination();
  }

  addProductList() {
    getProducts(
      this.setProductListAndPagination.bind(this),
      showErrorMessage,
      PRODUCT_PER_PAGE
    );
    this._productList = new ProductListView();
    this._pageWrapper.appendChild(this._productList);
  }

  get productList() {
    return this._productList;
  }

  setProductList(products: Array<IProductData>) {
    this._productList.setProducts(products);
  }

  setPagination(total: number) {
    const lastPage = Math.ceil(total / PRODUCT_PER_PAGE);
    this._paginationBlock.updateButtons(lastPage);
  }

  setProductListAndPagination(products: Array<IProductData>, total?: number) {
    this.setProductList(products);
    if (total !== undefined) {
      this.setPagination(total);
    }
  }

  addControls() {
    this._controlsBlock = new CatalogControls(
      this.updateProductListAndPagination.bind(this)
    );
    this._pageWrapper.appendChild(this._controlsBlock);
  }

  addChipsBlock() {
    this._chipsBlock = new ChipsBlockView();
    this._pageWrapper.appendChild(this._chipsBlock);
  }

  addBreadCrumbs() {
    this._breadCrumbs = new CategoryBreadCrumbsView(
      this.updateProductListAndPagination.bind(this)
    );
    this._pageWrapper.appendChild(this._breadCrumbs);
  }

  addCategoryList() {
    getCategories(
      this._categoryDropDown.setCategories.bind(this._categoryDropDown),
      showErrorMessage
    );
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
      this.updateProductListAndPagination.bind(this)
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
      this.updateProductListAndPagination.bind(this)
    );
    this.appendChild(this._filtersModal);
  }

  addPagination() {
    this._paginationBlock = new PaginationView(
      this.updateProductList.bind(this)
    );
    this._pageWrapper.appendChild(this._paginationBlock);
  }

  updateProductList() {
    this._productList.removeContent();
    this._chipsBlock.clearChips();
    const { searchString } = this._controlsBlock;
    const { sortBy } = this._sortDropDown;
    const filtersRequest = this.prepareFilters();
    this._breadCrumbs.clear();
    this._breadCrumbs.generateFromPath(currentCategory.categoryPath);

    getProducts(
      this.setProductList.bind(this),
      showErrorMessage,
      PRODUCT_PER_PAGE,
      PRODUCT_PER_PAGE * this._paginationBlock.pageNumber,
      searchString,
      filtersRequest,
      [sortBy]
    );
  }

  updateProductListAndPagination() {
    this._productList.removeContent();
    this._chipsBlock.clearChips();
    const { searchString } = this._controlsBlock;
    const { sortBy } = this._sortDropDown;
    const filtersRequest = this.prepareFilters();
    this._breadCrumbs.clear();
    this._breadCrumbs.generateFromPath(currentCategory.categoryPath);

    getProducts(
      this.setProductListAndPagination.bind(this),
      showErrorMessage,
      PRODUCT_PER_PAGE,
      0,
      searchString,
      filtersRequest,
      [sortBy]
    );
  }

  prepareFilters() {
    const { filters } = this._filtersModal;
    if (currentCategory.treeNode) {
      filters.push(categoryFilter(currentCategory.treeNode));
    }
    filters.forEach((filter) => this._chipsBlock.addChip(filter.description));
    const filtersRequest = filters.map((filter) => filter.filter);
    return filtersRequest;
  }
}
