const passport = require('passport');
const ResponseService = require('../services/ResponseService');
const JwtService = require('../services/JwtService');
const NotificationService = require('../services/NotificationService');
const RedisService = require('../services/RedisService');
const UtilService = require('../services/UtilService');
const Logger = require('../services/LogService');
const { jwt: jwtConfig } = require('../../config');

const EntityExistsError = require('../errors/EntityExistsError');
const AuthError = require('../errors/AuthError');
const { User, UserToken } = require('../models');

const controller = {
  /**
   * @api {post} /api/signup Signup user
   * @apiName Signup User
   * @apiPermission None
   * @apiGroup Auth
   *
   * @apiParam  {String} [email]
   * @apiParam  {String} [firstname]
   * @apiParam  {String} [lastname]
   * @apiParam  {String} [password]
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
  },

  /**
   * @api {post} /api/login Login user
   * @apiName Login User
   * @apiPermission None
   * @apiGroup Auth
   *
   * @apiParam  {String} [email]
   * @apiParam  {String} [password]
   *
   * @apiSuccess (200) {Object} mixed `User` object
   */

  async login(req, res, next) {
    passport.authenticate('local', async (err, user, message) => {
      try {
        if (!user) {
          return ResponseService.json(res, new AuthError(message));
        }

        if (err) {
          return ResponseService.json(res, new AuthError(err.message));
        }

        const userId = user.id;
        const token = JwtService.issueToken({ userId });

        res.cookie('sessionId', token, {
          maxAge: jwtConfig.expiration,
          secure: true,
          httpOnly: true
        });

        user = user.toJSON();
        RedisService.SET(userId, JSON.stringify(user));

        return ResponseService.json(res, 200, 'Successfully Logged In', {
          token
        });
      } catch (error) {
        Logger.error(`Error occured while logging in: ${error.message}`);
        return ResponseService.json(res, error);
      }
    })(req, res, next);
  },

  async authenticatedRoute(req, res) {
    return ResponseService.json(res, 200, 'Authenticated Route', req.user);
  }
};

module.exports = controller;
