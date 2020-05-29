const _ = require('lodash');
const ResponseService = require('../services/ResponseService');
const RedisService = require('../services/RedisService');
const JWTService = require('../services/JwtService');
const AuthError = require('../errors/AuthError');

// Should proceed to unauthenticated route only if unauthenticated to avoid duplication of JWT
exports.isUnauthenticated = (req, res, next) => {
  const {
    headers: { authorization }
  } = req;

  if (authorization) {
    const parts = authorization.split(' ');

    if (parts.length === 2) {
      const [scheme, credentials] = parts;

      if (/^Bearer$/i.test(scheme)) {
        const token = credentials;

        JWTService.verifyToken(token, async (err, decoded) => {
          if (err) {
            return next();
          }

          const { userId } = decoded;
          const stringifiedUser = await RedisService.GETAsync(userId);

          if (_.isEmpty(stringifiedUser)) {
            return next();
          }

          return ResponseService.json(res, 200, 'Already Authenticated');
        });

        return next();
      }
      return next();
    }
    return next();
  }
  return next();
};

// Should proceed to authenticated route only if authentcaticated
exports.isAuthenticated = (req, res, next) => {
  const {
    headers: { authorization }
  } = req;

  if (authorization) {
    const parts = authorization.split(' ');

    if (parts.length === 2) {
      const [scheme, credentials] = parts;

      if (/^Bearer$/i.test(scheme)) {
        const token = credentials;

        JWTService.verifyToken(token, async (err, decoded) => {
          if (err) {
            return ResponseService.json(res, new AuthError('JWT Expired'));
          }

          const { userId } = decoded;
          const stringifiedUser = await RedisService.GETAsync(userId);

          if (_.isEmpty(stringifiedUser)) {
            return ResponseService.json(res, new AuthError('Invalid Entity'));
          }

          const user = JSON.parse(stringifiedUser);
          req.user = user;

          return next();
        });
        return undefined;
      }
      return ResponseService.json(
        res,
        new AuthError('Authorization header not found')
      );
    }
    return ResponseService.json(
      res,
      new AuthError('Format is Authorization: Bearer [Token]')
    );
  }
  return ResponseService.json(
    res,
    new AuthError('No Authorization header not found')
  );
};
