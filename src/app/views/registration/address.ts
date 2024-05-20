import { BaseComponent, IAttributes } from '@components/base-component';
import { InputFieldComponent } from '@components/input-field-component';
import { ILabelAttriubutes, LabelComponent } from '@components/label-component';
import {
  IOptionAttributes,
  OptionComponent,
} from '@components/option-component';
import { IFormInputField, createInputField } from '@utils/create-input-field';
import atLeastOneCharacter from '@utils/validators/at-least-one-character-validator';
import noSpecialCharacterOrNumber from '@utils/validators/no-special-characters-or-numbers-validator';
import {
  postalCodeNoCountryValidator,
  postalCodeUKValidator,
  postalCodeUSSRValidator,
} from '@utils/validators/post-code-validator';
import { IValidator } from '@utils/validators/validator';
import { FormSelect } from 'materialize-css';
import { BaseAddress } from '@commercetools/platform-sdk';
import {
  CheckboxComponent,
  ICheckboxAttributes,
} from '@components/checkbox-component';
import FormSectionView from './form-section';

class AddressSection extends FormSectionView {
  private streetInput = new InputFieldComponent({}, {}, {});

  private cityInput = new InputFieldComponent({}, {}, {});

  private postalCodeInput = new InputFieldComponent({}, {}, {});

  private countrySelector: FormSelect;

  private selectComponent = new BaseComponent({});

  private countryInput = new BaseComponent({});

  private countryCode: string = '';

  private defaultCheckbox = new CheckboxComponent({});

  isEnable: boolean = true;

  private _isDefault: boolean = false;

  constructor(title: string) {
    super(title);
    this.addStreetInput();
    this.addCityInput();
    this.addCountryInput();
    this.addPostalCodeInput();
    this.addSetDefaultCheckbox();
  }

  private addStreetInput() {
    const attrs: IFormInputField = {
      id: 'street',
      type: 'text',
      label: 'Street',
      placeholder: 'Dan Crescent',
      customValidators: [atLeastOneCharacter],
    };
    this.streetInput = createInputField(attrs);
    this.appendChild(this.streetInput);
  }

  private addCityInput() {
    const attrs: IFormInputField = {
      id: 'city',
      type: 'text',
      label: 'City',
      placeholder: 'Lake Jeremyville',
      customValidators: [atLeastOneCharacter, noSpecialCharacterOrNumber],
    };
    this.cityInput = createInputField(attrs);
    this.appendChild(this.cityInput);
  }

  private addCountryInput() {
    const inputFieldAttrs: IAttributes = {
      classList: ['input-field', 'col', 's6'],
    };
    const labelAttrs: ILabelAttriubutes = {
      content: 'Country',
    };

    const inputFieldComponent = new BaseComponent(inputFieldAttrs);
    this.selectComponent = new BaseComponent({ tag: 'select' });
    const labelComponent = new LabelComponent(labelAttrs);
    labelComponent.removeClass('active');

    inputFieldComponent.appendChild(this.selectComponent);
    inputFieldComponent.appendChild(labelComponent);

    const options = ['Russia', 'United Kingdom', 'Belarus'];

    const placeholderOptionAttrs: IOptionAttributes = {
      content: 'Select country',
      value: '',
      disable: true,
      selected: true,
    };
    const placeholderOption = new OptionComponent(placeholderOptionAttrs);
    this.selectComponent.appendChild(placeholderOption);
    options.forEach((value, index) => {
      const optionAttrs: IOptionAttributes = {
        content: value,
        value: `${index + 1}`,
      };
      const optionComponent = new OptionComponent(optionAttrs);
      this.selectComponent.appendChild(optionComponent);
    });
    this.countryInput = inputFieldComponent;
    this.appendChild(this.countryInput);
  }

  private addPostalCodeInput() {
    const attrs: IFormInputField = {
      id: 'postal-code',
      type: 'text',
      label: 'Postal code',
      placeholder: '2154',
      customValidators: [this.postalCodeValidator],
    };
    this.postalCodeInput = createInputField(attrs);
    this.appendChild(this.postalCodeInput);
  }

  addSetDefaultCheckbox() {
    const attrs: ICheckboxAttributes = {
      onClick: () => {
        this.toggleisDefault();
      },
      content: 'Set Default',
    };
    this.defaultCheckbox = new CheckboxComponent(attrs);
    this.appendChild(this.defaultCheckbox);
  }

  toggleisDefault() {
    this.isDefault = !this.isDefault;
  }

  set isDefault(value: boolean) {
    this.defaultCheckbox.checked = value;
    this._isDefault = value;
  }

  get isDefault() {
    return this._isDefault;
  }

  setDefault(value: boolean) {
    this.isDefault = value;
  }

  setEnable(value: boolean) {
    this.isEnable = value;
  }

  private postalCodeValidator: IValidator = {
    invalidMessage: 'incorrect postal code',
    validateFunction: this.postalCodeValidateFunction.bind(this),
  };

  private postalCodeValidateFunction(value: string): boolean {
    const country = this.countrySelector.input.value;
    switch (country) {
      case 'Russia':
        this.countryCode = 'RU';
        return postalCodeUSSRValidator.validateFunction(value);
      case 'United Kingdom':
        this.countryCode = 'GB';
        return postalCodeUKValidator.validateFunction(value);
      case 'Belarus':
        this.countryCode = 'BY';
        return postalCodeUSSRValidator.validateFunction(value);
      default:
        return postalCodeNoCountryValidator.validateFunction(value);
    }
  }

  isValid(): boolean {
    if (!this.isEnable) return true;
    const inputs = [this.cityInput, this.streetInput, this.postalCodeInput];
    const isValid = inputs.reduce(
      (result, value) => result && value.isValid(),
      true
    );
    return isValid;
  }

  get address() {
    const addressData: BaseAddress = {
      city: this.cityInput.input.value,
      streetName: this.streetInput.input.value,
      country: this.countryCode,
      postalCode: this.postalCodeInput.input.value,
    };
    return addressData;
  }

  get htmlElement() {
    document.addEventListener('DOMContentLoaded', () => {
      try {
        this.countrySelector = FormSelect.init(this.selectComponent.node, {});
      } catch {}
    });
    return super.htmlElement;
  }
}

export default AddressSection;
