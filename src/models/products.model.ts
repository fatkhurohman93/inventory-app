import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import * as Interface from '@interfaces/index';
import { commonColumn } from './commonColumn';

const { TABLE_NAME } = Interface;

const ProductsModel = (
  sequelize: Sequelize
): ModelCtor<Model<Interface.Products>> => {
  return sequelize.define(
    TABLE_NAME.product,
    {
      name: {
        type: DataTypes.STRING('30'),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      code: {
        type: DataTypes.STRING('10'),
      },
      image: {
        type: DataTypes.STRING,
      },
      stock: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      unit: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      sellPrice: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      productDiscount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      productTax: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      categoryID: {
        type: DataTypes.MEDIUMINT,
        allowNull: true,
      },
      supplierID: {
        type: DataTypes.MEDIUMINT,
        allowNull: true,
      },
      ...commonColumn,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};

export default ProductsModel;
