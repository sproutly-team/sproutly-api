const AuthController = require('../controllers/AuthController')
const { validate, parseValidation } = require('../services/ValidationService')

module.exports = (api) => {
  api.get('/health', AuthController.healthcheck)
  api.post(
    '/signup',
    validate('signup'),
    parseValidation,
    AuthController.signup
  )
}
