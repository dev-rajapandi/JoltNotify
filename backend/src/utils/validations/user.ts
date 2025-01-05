import { ERROR_MESSAGES, CONSTANTS } from '../../config/constants';
import { initialValidationObject, handleFailedValidationUpdate } from './index';
import { IRegisterPayload } from '@Types/auth/payload';

const validateName = (name?: string) => {
  const validationObject = { ...initialValidationObject };
  if (!name) {
    return handleFailedValidationUpdate(validationObject, [
      ERROR_MESSAGES.NAME_MISSING,
    ]);
  }
  if (name?.length < CONSTANTS.NAME_MIN_LENGTH) {
    return handleFailedValidationUpdate(validationObject, [
      ERROR_MESSAGES.NAME_MIN_LENGTH,
    ]);
  }
  if (name?.length > CONSTANTS.NAME_MAX_LENGTH) {
    return handleFailedValidationUpdate(validationObject, [
      ERROR_MESSAGES.NAME_MIN_LENGTH,
    ]);
  }
  return validationObject;
};

const validateEmail = (email?: string) => {
  const validationObject = { ...initialValidationObject };
  if (!email) {
    return handleFailedValidationUpdate(validationObject, [
      ERROR_MESSAGES.EMAIL_MISSING,
    ]);
  }
  if (!CONSTANTS.EMAIL_REGEX.test(email)) {
    return handleFailedValidationUpdate(validationObject, [
      ERROR_MESSAGES.EMAIL_INVALID,
    ]);
  }
  return validationObject;
};

const validatePassword = (password?: string) => {
  const validationObject = { ...initialValidationObject };
  if (!password) {
    return handleFailedValidationUpdate(validationObject, [
      ERROR_MESSAGES.PASSWORD_MISSING,
    ]);
  }
  if (password?.length < CONSTANTS.PASSWORD_MIN_LENGTH) {
    return handleFailedValidationUpdate(validationObject, [
      ERROR_MESSAGES.NAME_MIN_LENGTH,
    ]);
  }
  return validationObject;
};

export const validateRegisterPayload = (registerPayload: IRegisterPayload) => {
  const { name, email, password } = registerPayload;
  let validationObject = { ...initialValidationObject };
  const nameValidation = validateName(name);
  if (!nameValidation.isValid) {
    validationObject = handleFailedValidationUpdate(
      validationObject,
      nameValidation.errors,
    );
  }
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    validationObject = handleFailedValidationUpdate(
      validationObject,
      emailValidation.errors,
    );
  }
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    validationObject = handleFailedValidationUpdate(
      validationObject,
      passwordValidation.errors,
    );
  }
  return validationObject;
};
