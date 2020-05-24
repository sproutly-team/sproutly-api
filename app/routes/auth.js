const AuthController = require('../controllers/AuthController')
const { validate, parseValidation } = require('../services/ValidationService')

module.exports = (api) => {
  api.get('/health', AuthController.healthcheck)
  api.get('/xx', AuthController.xx)
  api.post(
    '/signup',
    validate('signup'),
    parseValidation,
    AuthController.signup
  )
}
