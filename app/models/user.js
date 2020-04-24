module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // passcode: {
    //   type: DataTypes.INTEGER,
    // },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Not a valid email'
        }
      }
    },
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
        as: 'companyId'
      }
    },
    activated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    activationToken: {
      type: DataTypes.STRING
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    leaveDays: {
      type: DataTypes.INTEGER,
    }
  });

  User.associate = (models) => {
    User.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company'
    })

  };
  return User;
};