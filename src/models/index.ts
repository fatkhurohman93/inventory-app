import { Sequelize } from 'sequelize';
import UsersModel from './users.model';
import ProductsModel from './products.model';
import CategoriesModel from './categories.model';
import SuppliersModel from './suppliers.model';
import PaymentModesModel from './paymentModes.model';
import SalesMastersModel from './salesMaster.model';
import SalesDetailsModel from './salesDetails.model';
import ProductKeywordsModel from './productKeywords.model';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite',
  logging: false,
  dialectOptions: { decimalNumbers: true },
});
import {
  PRODUCT_ATTRIBUTES,
  SALES_MASTER_ATTRIBUTES,
  SALES_DETAIL_ATTRIBUTES,
  PRODUCT_KEYWORD_ATTRIBUTES,
} from '@interfaces/index';

const models = {
  users: UsersModel(sequelize),
  products: ProductsModel(sequelize),
  categories: CategoriesModel(sequelize),
  suppliers: SuppliersModel(sequelize),
  paymentModes: PaymentModesModel(sequelize),
  salesMasters: SalesMastersModel(sequelize),
  salesDetails: SalesDetailsModel(sequelize),
  productKeywords: ProductKeywordsModel(sequelize),
};

models.products.belongsTo(models.categories, {
  foreignKey: PRODUCT_ATTRIBUTES.categoryID,
});
models.products.belongsTo(models.suppliers, {
  foreignKey: PRODUCT_ATTRIBUTES.supplierID,
});
models.productKeywords.belongsTo(models.products, {
  foreignKey: PRODUCT_KEYWORD_ATTRIBUTES.productID,
});
models.salesMasters.belongsTo(models.paymentModes, {
  foreignKey: SALES_MASTER_ATTRIBUTES.paymentModeID,
});
models.salesDetails.belongsTo(models.salesMasters, {
  foreignKey: SALES_DETAIL_ATTRIBUTES.salesMasterID,
});
models.salesDetails.belongsTo(models.products, {
  foreignKey: SALES_DETAIL_ATTRIBUTES.productID,
});


models.products.hasMany(models.productKeywords, {
  foreignKey: PRODUCT_KEYWORD_ATTRIBUTES.productID,
});
models.salesMasters.hasMany(models.salesDetails, {
  foreignKey: SALES_DETAIL_ATTRIBUTES.salesMasterID,
});

export { sequelize, models };
