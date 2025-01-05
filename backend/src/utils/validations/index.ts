import { IValidationObject } from '@Types/index';

export const initialValidationObject: IValidationObject = {
  isValid: true,
  errors: [],
};

export const handleFailedValidationUpdate = (
  validationObject: IValidationObject,
  errorMessages: string[],
) => {
  validationObject.isValid = false;
  validationObject.errors = [...validationObject.errors, ...errorMessages];
  return validationObject;
};
