import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import * as Interface from '@interfaces/index';
import { commonColumn } from './commonColumn';

const { TABLE_NAME } = Interface;

const UsersModel = (
  sequelize: Sequelize
): ModelCtor<Model<Interface.Users>> => {
  return sequelize.define(
    TABLE_NAME.user,
    {
      userName: {
        type: DataTypes.STRING('16'),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING('30'),
      },
      email: {
        type: DataTypes.STRING('30'),
      },
      password: {
        type: DataTypes.STRING,
      },
      flagRoles: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      image: {
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

export default UsersModel;
