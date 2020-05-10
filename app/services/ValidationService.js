const { isEmpty } = require('lodash')
const { check, validationResult } = require('express-validator')

const ResponseService = require('../services/ResponseService')
const ValidateError = require('../errors/ValidateError')

// Validates api input data. Register route validation here
exports.validate = (method) => {
  switch (method) {
    case 'signup': {
      return [
        check('email')
          .isEmail()
          .normalizeEmail(),
        check('firstname')
          .not()
          .isEmpty()
          .trim()
          .escape(),
        check('lastname')
          .not()
          .isEmpty()
          .trim()
          .escape(),
        check('password')
          .not()
          .isEmpty()
          .trim()
          .escape()
      ]
    }
  }
}

// Middleware to parse validation response from validate method
exports.parseValidation = (req, res, next) => {
  const error = validationResult(req)
  if (!isEmpty(error.errors)) {
    ResponseService.json(res, new ValidateError(error))
  }
  next()
}
