import { CustomError } from './custom-error';

export class DatabaseValidationErr extends CustomError {
  statusCode = 400;
  reason = 'No data found in database, please check for the provided value!';
  constructor(public errors: { reason?: string; statusCode?: number }) {
    super('Error while retriving data!');
    Object.setPrototypeOf(this, DatabaseValidationErr.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.errors.reason || this.reason,
        status: this.errors.statusCode || this.statusCode,
      },
    ];
  }
}
