import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import * as Interface from '@interfaces/index';
import { commonColumn } from './commonColumn';

const { TABLE_NAME } = Interface;

const ProductKeywordsModel = (
  sequelize: Sequelize
): ModelCtor<Model<Interface.ProductKeywords>> => {
  return sequelize.define(
    TABLE_NAME.product_keyword,
    {
      name: {
        type: DataTypes.STRING('30'),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      productID: {
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

export default ProductKeywordsModel;
