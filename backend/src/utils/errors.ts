import { IValidationObject } from '@Types/index';

export class ValidationError extends Error {
  public statusCode: number;
  public validationErrors: string[];

  constructor(validationResult: IValidationObject) {
    super('Validation failed');
    this.name = 'ValidationError';
    this.statusCode = 400; // HTTP Bad Request
    this.validationErrors = validationResult.errors;
    Error.captureStackTrace(this, ValidationError);
  }
}

export class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string = 'Conflict occurred') {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409; // HTTP Conflict
    Error.captureStackTrace(this, ConflictError);
  }
}
