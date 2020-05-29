const BaseError = require('./BaseError');

/**
 * Constructor.
 *
 * "Authentication Error"

 */
class AuthError extends BaseError {
  constructor(message) {
    const properties = {
      status: 401,
      code: 'auth_error'
    };
    super(message, properties);

    this.message = message;
    this.name = this.constructor.name;
  }
}

module.exports = AuthError;
