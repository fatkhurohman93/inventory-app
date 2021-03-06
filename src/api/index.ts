import { Router } from 'express';
import Auth from '@routers/auth.router';
import User from '@routers/user.router';
import Category from '@routers/category.router';
import Supplier from '@routers/supplier.router';
import Product from '@routers/product.router';
import PaymentMode from '@routers/paymentMode.router';
import SalesMaster from '@routers/salesMaster.router';
import SalesDetail from '@routers/salesDetail.router';
import ProductKeyword from '@routers/productKeyword.router';

export default () => {
  const app = Router();

  Auth(app);
  User(app);
  Category(app);
  Supplier(app);
  Product(app);
  PaymentMode(app);
  SalesMaster(app);
  SalesDetail(app);
  ProductKeyword(app);

  return app;
};
