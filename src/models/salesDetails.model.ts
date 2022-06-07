import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import * as Interface from '@interfaces/index';
import { commonColumn } from './commonColumn';

const { TABLE_NAME } = Interface;

const SalesDetailsModel = (
  sequelize: Sequelize
): ModelCtor<Model<Interface.SalesDetails>> => {
  return sequelize.define(
    TABLE_NAME.sales_detail,
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
      transDate: {
        type: DataTypes.DATE,
      },
      salesMasterID: {
        type: DataTypes.MEDIUMINT,
        allowNull: true,
      },
      productID: {
        type: DataTypes.MEDIUMINT,
        allowNull: true,
      },
      productName: {
        type: DataTypes.STRING('20'),
      },
      notes: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      unit: {
        type: DataTypes.STRING('10'),
      },
      sellPrice: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      tax: {
        type: DataTypes.DECIMAL,
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

export default SalesDetailsModel;
