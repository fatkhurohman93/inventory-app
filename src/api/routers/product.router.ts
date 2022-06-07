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
} from '@controllers/product.controller';
import { catchAsync } from '@utils/index';
import { ROUTES, ROUTES_PRODUCT } from '@interfaces/index';
import {
  verifyToken,
  isRoot,
  isAdmin,
  isUser,
} from '@api/middlewares/jwt/auth.jwt';

const router = Router();

export default (app: Router) => {
  app.use(ROUTES.product, router);
  router
    .route(ROUTES_PRODUCT.create)
    .post(verifyToken, isAdmin, catchAsync(Create));
  router
    .route(ROUTES_PRODUCT.bulkCreate)
    .post(verifyToken, isAdmin, catchAsync(BulkCreate));
  router
    .route(ROUTES_PRODUCT.findAll)
    .post(verifyToken, isUser, catchAsync(FindAll));
  router
    .route(ROUTES_PRODUCT.findOne)
    .post(verifyToken, isUser, catchAsync(FindOne));
  router
    .route(ROUTES_PRODUCT.update)
    .put(verifyToken, isAdmin, catchAsync(Update));
  router
    .route(ROUTES_PRODUCT.archived)
    .put(verifyToken, isAdmin, catchAsync(Archived));
  router
    .route(ROUTES_PRODUCT.unarchived)
    .put(verifyToken, isAdmin, catchAsync(Unarchived));
  router
    .route(ROUTES_PRODUCT.destroy)
    .delete(verifyToken, isRoot, catchAsync(Destroy));
};
