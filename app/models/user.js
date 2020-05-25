const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      counter: {
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      firstname: { type: DataTypes.STRING, allowNull: false },
      lastname: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: ['businessOwner']
        }
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      authenticated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      indexes: [
        // Create a unique index on email
        {
          unique: true,
          fields: ['email']
        }
      ]
    }
  );

  User.beforeCreate(
    (user) =>
      new Promise((resolve) => {
        user.password = bcrypt.hashSync(user.password, 8);
        return resolve(user);
      })
  );

  User.associate = function(models) {
    User.hasMany(models.UserToken, { as: 'user' });
    // associations can be defined here
  };

  return User;
};
