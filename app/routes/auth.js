const AuthController = require('../controllers/AuthController');
const { validate, parseValidation } = require('../services/ValidationService');
const {
  isAuthenticated,
  isUnauthenticated
} = require('../middleware/authentication');

module.exports = api => {
  // ==== Signup ====
  api.post(
    '/signup',
    isUnauthenticated,
    validate('signup'),
    parseValidation,
    AuthController.signup
  );

  // ==== Login ====
  api.post(
    '/login',
    isUnauthenticated,
    validate('login'),
    parseValidation,
    AuthController.login
  );

  api.get('/test', isAuthenticated, AuthController.authenticatedRoute);
};
