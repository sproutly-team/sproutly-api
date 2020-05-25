const ResponseService = require('../services/ResponseService');
const NotificationService = require('../services/NotificationService');
const UtilService = require('../services/UtilService');
const Logger = require('../services/LogService');

const EntityExistsError = require('../errors/EntityExistsError');
const { User, UserToken } = require('../models');

const controller = {
  healthcheck(req, res) {
    return ResponseService.json(res, 200, 'up');
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
      const inputs = req.body;

      inputs.email = inputs.email.toLowerCase();
      inputs.firstname = inputs.email.toLowerCase();
      inputs.lastname = inputs.email.toLowerCase();

      const signupDetails = {
        ...inputs,
        role: 'businessOwner'
      };

      Logger.info(`Checking if email ${inputs.email} exists already`);
      const existingUser = await User.findOne({
        where: {
          email: inputs.email,
          isDeleted: false
        }
      });

      if (existingUser) {
        Logger.error(`User with email ${existingUser.email} alrady exists`);
        return ResponseService.json(
          res,
          new EntityExistsError('user', existingUser.email)
        );
      }

      const newUser = await User.create(signupDetails);
      const authToken = UtilService.randomGenerator(7);

      const tokenDetails = {
        token: authToken,
        tokenType: 'signup',
        userId: newUser.id
      };

      Logger.info('User registered and token sent successfully');
      await UserToken.create(tokenDetails);

      const { firstname, email } = newUser;

      Logger.info('Notification Sent');
      await NotificationService.newSignup({
        email,
        firstname,
        code: authToken
      });

      return ResponseService.json(res, 200, 'Successfully Signed Up', newUser);
    } catch (err) {
      Logger.error(`Error occured while signing up: ${err.message}`);
      return ResponseService.json(res, err);
    }
  }
};

module.exports = controller;
