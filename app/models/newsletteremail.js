'use strict';
module.exports = (sequelize, DataTypes) => {
  const NewsLetterEmail = sequelize.define('NewsLetterEmail', {
    email: DataTypes.STRING,
    subscribed: DataTypes.BOOLEAN
  }, {});
  NewsLetterEmail.associate = function(models) {
    // associations can be defined here
  };
  return NewsLetterEmail;
};