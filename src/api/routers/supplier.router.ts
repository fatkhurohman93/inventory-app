import { Router } from 'express';
import {
  Create,
  BulkCreate,
  FindAll,
  FindOne,
  Update,
  Archived,
  Unarchived,
  Destroy,
} from '@controllers/supplier.controller';
import { catchAsync } from '@utils/index';
import { ROUTES, ROUTES_SUPPLIER } from '@interfaces/index';
import {
  verifyToken,
  isRoot,
  isAdmin,
  isUser,
} from '@api/middlewares/jwt/auth.jwt';

const router = Router();

export default (app: Router) => {
  app.use(ROUTES.supplier, router);
  router
    .route(ROUTES_SUPPLIER.create)
    .post(verifyToken, isAdmin, catchAsync(Create));
  router
    .route(ROUTES_SUPPLIER.bulkCreate)
    .post(verifyToken, isAdmin, catchAsync(BulkCreate));
  router
    .route(ROUTES_SUPPLIER.findAll)
    .post(verifyToken, isUser, catchAsync(FindAll));
  router
    .route(ROUTES_SUPPLIER.findOne)
    .post(verifyToken, isUser, catchAsync(FindOne));
  router
    .route(ROUTES_SUPPLIER.update)
    .put(verifyToken, isAdmin, catchAsync(Update));
  router
    .route(ROUTES_SUPPLIER.archived)
    .put(verifyToken, isAdmin, catchAsync(Archived));
  router
    .route(ROUTES_SUPPLIER.unarchived)
    .put(verifyToken, isAdmin, catchAsync(Unarchived));
  router
    .route(ROUTES_SUPPLIER.destroy)
    .delete(verifyToken, isRoot, catchAsync(Destroy));
};
