const ResponseService = require('../services/ResponseService')
const NotificationService = require('../services/NotificationService')
const UtilService = require('../services/UtilService')

const EntityExistsError = require('../errors/EntityExistsError')
const { User, UserToken } = require('../models')

const controller = {
  healthcheck(req, res) {
    return ResponseService.json(res, 200, 'up')
  },
  /**
   * @api {post} /api/signup Signup user
   * @apiName Signup User
   * @apiPermission Nonep
   * @apiGroup Auth
   *
   * @apiParam  {String} [email]
   * @apiParam  {String} [firstname]
   * @apiParam  {String} [lastname]
   *
   * @apiSuccess (200) {Object} mixed `User` object
   */

  async signup(req, res) {
    try {
      const inputs = req.body
      const signupDetails = {
        ...inputs,
        role: 'businessOwner'
      }

      const existingUser = await User.findOne({
        where: {
          email: inputs.email,
          isDeleted: false
        }
      })

      if (existingUser) {
        return ResponseService.json(
          res,
          new EntityExistsError('user', existingUser.email)
        )
      }

      const newUser = await User.create(signupDetails)
      const authToken = UtilService.randomGenerator(7)

      const tokenDetails = {
        token: authToken,
        tokenType: 'signup',
        userId: newUser.id
      }

      await UserToken.create(tokenDetails)

      const { firstname, email } = newUser
      await NotificationService.newSignup({ email, firstname, code: authToken })

      return ResponseService.json(res, 200, 'Successfully Signed Up', newUser)
    } catch (err) {
      return ResponseService.json(res, err)
    }
  }
}

module.exports = controller
