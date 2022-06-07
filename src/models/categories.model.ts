import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import * as Interface from '@interfaces/index';
import { commonColumn } from './commonColumn';

const { TABLE_NAME } = Interface;

const CategoriesModel = (
  sequelize: Sequelize
): ModelCtor<Model<Interface.Categories>> => {
  return sequelize.define(
    TABLE_NAME.category,
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
      productCategoryDiscount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      productCategoryTax: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      ...commonColumn,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};

export default CategoriesModel;
