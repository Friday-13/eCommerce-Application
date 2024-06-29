import { IInputAttributes } from '@components/input-component';
import {
  IInputFieldAttributes,
  InputFieldComponent,
} from '@components/input-field-component';
import { ILabelAttriubutes } from '@components/label-component';
import { IValidator } from './validators/validator';

export interface IFormInputField {
  id: string;
  placeholder: string;
  label: string;
  type: string;
  customValidators: Array<IValidator>;
  disabled?: boolean;
  required?: boolean;
}

export function createInputField(fieldAttrs: IFormInputField) {
  const attrs: IInputFieldAttributes = {
    customValidators: fieldAttrs.customValidators,
  };
  const inputAttrs: IInputAttributes = {
    type: fieldAttrs.type,
    placeholder: fieldAttrs.placeholder,
    disabled: fieldAttrs.disabled,
    required: fieldAttrs.required,
    id: fieldAttrs.id,
  };
  const labelAttrs: ILabelAttriubutes = {
    for: fieldAttrs.id,
    content: fieldAttrs.label,
  };
  return new InputFieldComponent(attrs, labelAttrs, inputAttrs);
}
