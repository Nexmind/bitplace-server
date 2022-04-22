import { ErrorType, ErrorValidation, ErrorResponse } from './types';

export class CustomError extends Error {
  private httpStatusCode: number;
  private errorType: ErrorType;
  private errors: string[] | null;
  private errorRaw: any;
  private errorsValidation: ErrorValidation[] | null;
  private incriminateValue: string | null

  constructor(
    httpStatusCode: number,
    errorType: ErrorType,
    message: string,
    errors: string[] | null = null,
    errorRaw: any = null,
    errorsValidation: ErrorValidation[] | null = null,
  ) {
    super(message);

    this.name = this.constructor.name;

    this.httpStatusCode = httpStatusCode;
    this.errorType = errorType;
    this.errors = errors;
    this.errorRaw = errorRaw;

    if (errorRaw.driverError && errorRaw.driverError.code === 'ER_DUP_ENTRY') {
      const msg: string = errorRaw.driverError.sqlMessage

      const firstIndex = msg.indexOf("'") + 1
      const fieldValue = msg.substring(
        msg.indexOf("'") + 1,
        msg.indexOf("'", firstIndex)
      )

      this.incriminateValue = fieldValue
    }
      this.errorsValidation = errorsValidation;
  }

  get HttpStatusCode() {
    return this.httpStatusCode;
  }

  get JSON(): ErrorResponse {
    return {
      errorType: this.errorType,
      errorMessage: this.message,
      errors: this.errors,
      errorRaw: this.errorRaw,
      errorsValidation: this.errorsValidation,
      incriminateValue: this.incriminateValue,
      stack: this.stack,
    };
  }
}
