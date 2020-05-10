'use strict'

module.exports = (sequelize, DataTypes) => {
  const UserToken = sequelize.define(
    'UserToken',
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tokenType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: ['signup', 'completion']
        }
      },
      userId: {
        type: DataTypes.UUID
      }
    },
    {}
  )

  UserToken.associate = function(models) {
    UserToken.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  }

  return UserToken
}
