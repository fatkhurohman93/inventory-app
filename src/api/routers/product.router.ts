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
import { ROUTES, ROUTES_CRUD } from '@interfaces/index';
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
    .route(ROUTES_CRUD.create)
    .post(verifyToken, isAdmin, catchAsync(Create));
  router
    .route(ROUTES_CRUD.bulkCreate)
    .post(verifyToken, isAdmin, catchAsync(BulkCreate));
  router
    .route(ROUTES_CRUD.findAll)
    .post(verifyToken, isUser, catchAsync(FindAll));
  router
    .route(ROUTES_CRUD.findOne)
    .post(verifyToken, isUser, catchAsync(FindOne));
  router
    .route(ROUTES_CRUD.update)
    .put(verifyToken, isAdmin, catchAsync(Update));
  router
    .route(ROUTES_CRUD.archived)
    .put(verifyToken, isAdmin, catchAsync(Archived));
  router
    .route(ROUTES_CRUD.unarchived)
    .put(verifyToken, isAdmin, catchAsync(Unarchived));
  router
    .route(ROUTES_CRUD.destroy)
    .delete(verifyToken, isRoot, catchAsync(Destroy));
};
