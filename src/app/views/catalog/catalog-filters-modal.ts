import { BaseComponent, IAttributes } from '@components/base-component';
import {
  ButtonComponent,
  IButtonAttributes,
} from '@components/button-component';
import {
  ButtonWithIconComponent,
  IButtonWithIconAttributes,
} from '@components/button-with-icons';
import createPairRangeField from '@utils/create-pair-range-field';
import { filterAttributeRange, filterPriceRange } from '@utils/query-args';
import FormSectionView from '@views/registration/form-section';
import View from '@views/view';
import { Modal } from 'materialize-css';

export default class CatalogFiltersView extends View {
  private _content = new View({});

  priceRanges = createPairRangeField(0, 1);

  pieceCountRanges = createPairRangeField(0, 1);

  private _modal: Modal;

  private _buttonSection = new FormSectionView();

  constructor(applyCallback: () => void) {
    const attrs: IAttributes = {
      id: 'modal-filter',
      classList: 'modal',
    };
    super(attrs);
    this.addContent(applyCallback);
    this._modal = Modal.init(this.htmlElement);
  }

  addContent(applyCallback: () => void) {
    const attrs: IAttributes = {
      classList: 'modal-content',
    };
    this._content = new View(attrs);
    this.appendChild(this._content);
    this._content.appendChild(
      new BaseComponent({ tag: 'h3', content: 'Filters' })
    );
    this.addPriceFilter();
    this.addPieceCountFilter();
    this.addButtons(applyCallback);
  }

  addPriceFilter() {
    const section = new FormSectionView('Price Range');
    this._content.appendChild(section);
    this.priceRanges = createPairRangeField(5, 500);
    section.appendChild(this.priceRanges);
  }

  addPieceCountFilter() {
    const section = new FormSectionView('Piece Count Range');
    this._content.appendChild(section);
    this.pieceCountRanges = createPairRangeField(100, 6000);
    section.appendChild(this.pieceCountRanges);
  }

  addButtons(applyCallback: () => void) {
    this._buttonSection = new FormSectionView();
    this.addSubmitButton(applyCallback);
    this.addResetButton(applyCallback);
  }

  addSubmitButton(applyCallback: () => void) {
    const attrs: IButtonAttributes = {
      content: 'Apply',
      onClick: () => {
        applyCallback();
        this._modal.close();
      },
      type: 'button',
      tag: 'div',
    };
    const applyBtn = new ButtonComponent(attrs);
    applyBtn.addClass('red');
    applyBtn.addClass('lighten-2');
    this._buttonSection.appendChild(applyBtn);
    this._content.appendChild(this._buttonSection);
  }

  addResetButton(applyCallback: () => void) {
    const attrs: IButtonWithIconAttributes = {
      onClick: () => {
        this.resetFilters();
        applyCallback();
        this._modal.close();
      },
      type: 'button',
      tag: 'div',
      icon: 'refresh',
    };
    const applyBtn = new ButtonWithIconComponent(attrs);
    applyBtn.addClass('red');
    applyBtn.addClass('lighten-2');
    this._buttonSection.appendChild(applyBtn);
    this._content.appendChild(this._buttonSection);
  }

  get filters() {
    const filters = [];
    filters.push(
      filterPriceRange(this.priceRanges.minValue, this.priceRanges.maxValue)
    );
    filters.push(
      filterAttributeRange(
        'piece-count',
        this.pieceCountRanges.minValue,
        this.pieceCountRanges.maxValue
      )
    );
    return filters;
  }

  resetFilters() {
    this.priceRanges.resetValues();
    this.pieceCountRanges.resetValues();
  }
}
