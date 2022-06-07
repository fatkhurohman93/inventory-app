import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import * as Interface from '@interfaces/index';
import { commonColumn } from './commonColumn';

const { TABLE_NAME } = Interface;

const SalesMastersModel = (
  sequelize: Sequelize
): ModelCtor<Model<Interface.SalesMasters>> => {
  return sequelize.define(
    TABLE_NAME.sales_master,
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
      notes: {
        type: DataTypes.STRING,
      },
      subTotal: {
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
      deliveryFee: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      otherFee: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      otherFee2: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      salesTotal: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      paymentModeID: {
        type: DataTypes.MEDIUMINT,
        allowNull: true,
      },
      paymentModeName: {
        type: DataTypes.STRING('20'),
      },
      customerName: {
        type: DataTypes.STRING('30'),
      },
      customerEmail: {
        type: DataTypes.STRING('20'),
      },
      customerPhone: {
        type: DataTypes.STRING('20'),
      },
      purchasedStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      purchasedTime: {
        type: DataTypes.DATE,
      },
      ...commonColumn,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};

export default SalesMastersModel;
