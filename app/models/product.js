module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    itemCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
        as: 'companyId'
      }
    }
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company'
    })

  };
  return Product;
};