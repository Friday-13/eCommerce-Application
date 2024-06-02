import DropdownView from '@utils/drop-down-view';
import styles from './catalog-controls-style.module.scss';

export default class CategorDropDown extends DropdownView {
  constructor(applyCallback: () => void) {
    super('category-dropdown', applyCallback);
    this.createOption('option1', () => {
      console.log('hehe1');
    });
    this.createSubOption('suboption1', () => {
      console.log('subhehe1');
    });
    this.createOption('option2', () => {
      console.log('hehe2');
    });
    this.createOption('option3', () => {
      console.log('hehe3');
    });
  }

  createSubOption(text: string, onClick: () => void, icon?: string) {
    this.createOption(text, onClick, icon);
    this._options[this._options.length - 1].addClass(styles.subCategory);
  }
}
