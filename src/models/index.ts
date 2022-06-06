import { Sequelize } from 'sequelize';
import UsersModel from './users.model';
import ProductsModel from './products.model';
import CategoriesModel from './categories.model';
import SuppliersModel from './suppliers.model';
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite',
  logging: false,
  dialectOptions: { decimalNumbers: true },
});
import { PRODUCT_ATTRIBUTES } from '@interfaces/index';

const models = {
  users: UsersModel(sequelize),
  products: ProductsModel(sequelize),
  categories: CategoriesModel(sequelize),
  suppliers: SuppliersModel(sequelize),
};

models.products.hasOne(models.categories, {
  foreignKey: PRODUCT_ATTRIBUTES.id,
});
models.products.hasOne(models.suppliers, {
  foreignKey: PRODUCT_ATTRIBUTES.id,
});

export { sequelize, models };
