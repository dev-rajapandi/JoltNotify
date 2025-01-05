import { IConstants } from '@Types/config/constants';

export const CONSTANTS: IConstants = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_REGEX: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

export const ERROR_MESSAGES = {
  NAME_MISSING: 'Name is required.',
  NAME_MIN_LENGTH: `Name should be minimum ${CONSTANTS.NAME_MIN_LENGTH} characters.`,
  NAME_MAX_LENGTH: `Name should not be more than ${CONSTANTS.NAME_MIN_LENGTH} characters.`,
  EMAIL_MISSING: 'Email is required.',
  EMAIL_INVALID: 'Email is invalid.',
  PASSWORD_MISSING: 'Password is required.',
  PASSWORD_MIN_LENGTH: `Name should be minimum ${CONSTANTS.PASSWORD_MIN_LENGTH} characters.`,
};
