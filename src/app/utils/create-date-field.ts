import {
  IInputFieldAttributes,
  InputFieldComponent,
} from '@components/input-field-component';
import { IInputAttributes } from '@components/input-component';
import { ILabelAttriubutes } from '@components/label-component';
import { Datepicker } from 'materialize-css';
import birthdayLimitation from './validators/age-validator';
import { IFormInputField } from './create-input-field';

export default function createDateField(
  label: string,
  placeholder: string,
  id: string
) {
  const fieldAttrs: IFormInputField = {
    label,
    id,
    type: 'text',
    placeholder,
    customValidators: [birthdayLimitation],
  };
  const attrs: IInputFieldAttributes = {
    customValidators: fieldAttrs.customValidators,
  };
  const inputAttrs: IInputAttributes = {
    type: fieldAttrs.type,
    placeholder: fieldAttrs.placeholder,
    classList: 'datepicker',
  };
  const labelAttrs: ILabelAttriubutes = {
    for: fieldAttrs.id,
    content: fieldAttrs.label,
  };
  const inputField = new InputFieldComponent(attrs, labelAttrs, inputAttrs);

  Datepicker.init(inputField.input.node, {
    minDate: new Date('1900-01-01T00:00:00'),
    maxDate: new Date(),
    defaultDate: new Date('1984-11-01'),
    yearRange: 100,
    onClose: () => {
      inputField.isValid();
    },
    format: 'yyyy-mm-dd',
  });

  return inputField;
}
