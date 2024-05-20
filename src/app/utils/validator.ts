export type TValidatorFunction = (value: string) => boolean;
export interface IValidator {
  validateFunction: TValidatorFunction;
  invalidMessage: string;
}
