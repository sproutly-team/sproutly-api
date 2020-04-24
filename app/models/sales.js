module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
        as: 'companyId'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
        as: 'productId'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company'
    })
    Sales.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product'
    })

  };
  return Sales;
};