'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monthlySalesRev: {
      type: DataTypes.STRING,
      allowNull: false
    },
    noOfEmployees: {
      type: DataTypes.INTEGER,
    },
    dateOfInc: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    typeOfBusiness: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING
    },
    postalCode: {
      type: DataTypes.STRING,
    },
    businessNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    }
  });
  Company.associate = (models) => {
    Company.hasMany(models.User, {
      foreignKey: 'companyId',
      as: 'user'
    });
    Company.hasMany(models.Product, {
      foreignKey: 'companyId',
      as: 'product'
    });
    Company.hasMany(models.Sales, {
      foreignKey: 'companyId',
      as: 'sales'
    });
  };
  return Company;
};