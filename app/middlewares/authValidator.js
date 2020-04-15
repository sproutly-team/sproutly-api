const { errorMessages } = require('../constants/messages');
const { errorResponse } = require("../services/responseService")
const { codes } = require("../constants/code")
const { validateEmail, validateNonEmpty, checkLength } = require('../helper/inputValidator')

class validate {
  /**
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {object} message
   * @memberof validate
   */
  static signUpValidator(req, res, next) {
    const validEmail = validateEmail(req.body.email)
    const emptyfirstName = validateNonEmpty(req.body.firstName)
    const emptyLastName = validateNonEmpty(req.body.lastName)
    const emptyUsername = validateNonEmpty(req.body.username)
    const emptyPassword = validateNonEmpty(req.body.password)
    const emptyVerifyPassword = validateNonEmpty(req.body.confirmPassword)
    const passwordLength = checkLength(req.body.password, 5)
    const matchingPasswords = req.body.password == req.body.confirmPassword

    if (!validEmail) return errorResponse(res, "", codes.BAD_REQUEST, errorMessages.INVALID_INPUT_PARAMS)
    if (!emptyfirstName) return errorResponse(res, "", codes.BAD_REQUEST, errorMessages.INVALID_INPUT_PARAMS)
    if (!emptyLastName) return errorResponse(res, "", codes.BAD_REQUEST, errorMessages.INVALID_INPUT_PARAMS)
    if (!emptyUsername) return errorResponse(res, "", codes.BAD_REQUEST, errorMessages.INVALID_INPUT_PARAMS)
    if (!emptyPassword) return errorResponse(res, "", codes.BAD_REQUEST, errorMessages.INVALID_PASSWORD)
    if (!emptyVerifyPassword) return errorResponse(res, "", codes.BAD_REQUEST, errorMessages.CONFIRM_PASSWORD)
    if (!passwordLength) return errorResponse(res, "", codes.BAD_REQUEST, errorMessages.PASSWORD_TOO_SHORT)
    if (!matchingPasswords) return errorResponse(res, "", codes.BAD_REQUEST, errorMessages.PASSWORD_MISMATCH)

    next();
  }
  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {object} message
 * @memberof validate
 */
  static signInValidator(req, res, next) {
    const validEmail = validateEmail(req.body.email)
    const emptyPassword = validateNonEmpty(req.body.password)

    if (!validEmail) return errorResponse(res, "", codes.BAD_REQUEST, errorMessages.INVALID_INPUT_PARAMS)
    if (!emptyPassword) return errorResponse(res, "", codes.BAD_REQUEST, errorMessages.INVALID_PASSWORD)

    next();
  }
}

module.exports = {
  validate
}