const BaseError = require('./BaseError');

/**
 * Constructor.
 *
 * "Entity email exists"

 */
class ValidateError extends BaseError {
  constructor(value) {
    const message = `the following fields are missing ${JSON.stringify(value)}`;
    const properties = {
      status: 422,
      code: 'validation_error'
    };
    super(message, properties);

    this.message = message;
    this.name = this.constructor.name;
  }
}

module.exports = ValidateError;
