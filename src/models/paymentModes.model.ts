import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import * as Interface from '@interfaces/index';
import { commonColumn } from './commonColumn';

const PaymentModesModel = (
  sequelize: Sequelize
): ModelCtor<Model<Interface.PaymentModes>> => {
  return sequelize.define(
    'paymentmode',
    {
      name: {
        type: DataTypes.STRING('30'),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      ...commonColumn,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};

export default PaymentModesModel;
