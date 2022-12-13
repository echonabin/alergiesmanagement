import { CustomError } from './custom-error';

export class DatabaseValidationErr extends CustomError {
  statusCode = 400;
  reason = 'No data found in database, please check for the provided value!';

  constructor() {
    super('Error while retriving data!');

    Object.setPrototypeOf(this, DatabaseValidationErr.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason, status: this.statusCode }];
  }
}
