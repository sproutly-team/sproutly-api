const BaseError = require('./BaseError')

/**
 * Constructor.
 *
 * "Entity email exists"

 */
class EntityExistError extends BaseError {
  constructor(entity, value) {
    const message = `entity ${entity} (${value}) already exists`
    const properties = {
      status: 400,
      code: 'entity_exists'
    }
    super(message, properties)

    this.message = message
    this.name = this.constructor.name
  }
}

module.exports = EntityExistError
