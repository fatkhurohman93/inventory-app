import { Sequelize } from 'sequelize';
import UsersModel from './users.model';
import ProductsModel from './products.model';
import CategoriesModel from './categories.model';
import SuppliersModel from './suppliers.model';
import PaymentModesModel from './paymentModes.model';
import SalesMastersModel from './salesMaster.model';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite',
  logging: false,
  dialectOptions: { decimalNumbers: true },
});
import {
  CATEGORY_ATTRIBUTES,
  PRODUCT_ATTRIBUTES,
  SALES_MASTER_ATTRIBUTES,
  SUPPLIER_ATTRIBUTES,
  PAYMENT_MODE_ATTRIBUTES,
} from '@interfaces/index';

const models = {
  users: UsersModel(sequelize),
  products: ProductsModel(sequelize),
  categories: CategoriesModel(sequelize),
  suppliers: SuppliersModel(sequelize),
  paymentModes: PaymentModesModel(sequelize),
  salesMasters: SalesMastersModel(sequelize),
};

models.products.belongsTo(models.categories, {
  foreignKey: PRODUCT_ATTRIBUTES.categoryID,
});
models.products.belongsTo(models.suppliers, {
  foreignKey: PRODUCT_ATTRIBUTES.supplierID,
});
models.salesMasters.belongsTo(models.paymentModes, {
  foreignKey: SALES_MASTER_ATTRIBUTES.paymentModeID,
});

export { sequelize, models };
