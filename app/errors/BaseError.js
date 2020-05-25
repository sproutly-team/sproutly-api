class BaseError extends Error {
  constructor(message, properties) {
    super(message);

    this.message = message;
    this.status = properties.status;
    this.code = properties.code;

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

module.exports = BaseError;
