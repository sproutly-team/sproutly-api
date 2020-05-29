const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../../config');

module.exports = {
  issueToken(payload, expirytime) {
    const expiry = expirytime || jwtConfig.expiration;
    const token = jwt.sign(payload, jwtConfig.secret, {
      expiresIn: expiry * 60
    });
    return token;
  },

  verifyToken(token, cb) {
    return jwt.verify(token, jwtConfig.secret, {}, cb);
  }
};
