import { BaseComponent, IAttributes } from '@components/base-component';
import {
  ButtonComponent,
  IButtonAttributes,
} from '@components/button-component';
import createPairRangeField from '@utils/create-pair-range-field';
import FormSectionView from '@views/registration/form-section';
import View from '@views/view';
import { Modal } from 'materialize-css';

export default class CatalogFiltersView extends View {
  private _content = new View({});

  priceRanges = createPairRangeField(0, 1);

  pieceCountRanges = createPairRangeField(0, 1);

  constructor() {
    const attrs: IAttributes = {
      id: 'modal-filter',
      classList: 'modal',
    };
    super(attrs);
    this.addContent();
    Modal.init(this.htmlElement);
  }

  addContent() {
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
    this.addSubmitButton();
  }

  addPriceFilter() {
    const section = new FormSectionView('Price Range');
    this._content.appendChild(section);
    const priceRanges = createPairRangeField(5, 500);
    section.appendChild(priceRanges);
  }

  addPieceCountFilter() {
    const section = new FormSectionView('Piece Count Range');
    this._content.appendChild(section);
    this.pieceCountRanges = createPairRangeField(100, 6000);
    section.appendChild(this.pieceCountRanges);
  }

  addSubmitButton() {
    const section = new FormSectionView();
    const attrs: IButtonAttributes = {
      content: 'Apply',
      onClick: () => {
        // this.applyFilters();
      },
      type: 'button',
      tag: 'div',
    };
    const applyBtn = new ButtonComponent(attrs);
    applyBtn.addClass('red');
    applyBtn.addClass('lighten-2');
    section.appendChild(applyBtn);
    this._content.appendChild(section);
  }

  // applyFilters() {
  //   const minPrice = this.priceRanges.minValue;
  //   const maxPrice = this.priceRanges.maxValue;
  //   const minPieceCount = this.pieceCountRanges.minValue;
  //   const maxPieceCount = this.pieceCountRanges.maxValue;
  // }
}
