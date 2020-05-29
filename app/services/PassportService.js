const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

module.exports = () => {
  const authenticate = async (email, password, done) => {
    email = email.toLowerCase();
    try {
      const user = await User.findOne({
        where: {
          email
        }
      });

      if (_.isEmpty(user) || user.isDeleted) {
        return done(null, false, `email (${email}) does not exist`);
      }

      if (!user.validatePassword(password)) {
        return done(null, false, 'Incorrect Password');
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  };

  const localStrategy = new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (username, password, done) => {
      authenticate(username, password, done);
    }
  );

  passport.use('local', localStrategy);
};
