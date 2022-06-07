import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import * as Interface from '@interfaces/index';
import { commonColumn } from './commonColumn';

const SalesMastersModel = (
  sequelize: Sequelize
): ModelCtor<Model<Interface.SalesMasters>> => {
  return sequelize.define(
    'salesmaster',
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
      },
      discount: {
        type: DataTypes.DECIMAL,
      },
      tax: {
        type: DataTypes.DECIMAL,
      },
      deliveryFee: {
        type: DataTypes.DECIMAL,
      },
      otherFee: {
        type: DataTypes.DECIMAL,
      },
      otherFee2: {
        type: DataTypes.DECIMAL,
      },
      salesTotal: {
        type: DataTypes.DECIMAL,
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
