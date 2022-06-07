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
} from '@controllers/paymentMode.controller';
import { catchAsync } from '@utils/index';
import {
  ROUTES,
  ROUTES_PAYMENTMODE,
} from '@interfaces/index';
import {
  verifyToken,
  isRoot,
  isAdmin,
  isUser,
} from '@api/middlewares/jwt/auth.jwt';

const router = Router();

export default (app: Router) => {
  app.use(ROUTES.payment_mode, router);
  router
    .route(ROUTES_PAYMENTMODE.create)
    .post(verifyToken, isAdmin, catchAsync(Create));
  router
    .route(ROUTES_PAYMENTMODE.bulkCreate)
    .post(verifyToken, isAdmin, catchAsync(BulkCreate));
  router
    .route(ROUTES_PAYMENTMODE.findAll)
    .post(verifyToken, isUser, catchAsync(FindAll));
  router
    .route(ROUTES_PAYMENTMODE.findOne)
    .post(verifyToken, isUser, catchAsync(FindOne));
  router
    .route(ROUTES_PAYMENTMODE.update)
    .put(verifyToken, isAdmin, catchAsync(Update));
  router
    .route(ROUTES_PAYMENTMODE.archived)
    .put(verifyToken, isAdmin, catchAsync(Archived));
  router
    .route(ROUTES_PAYMENTMODE.unarchived)
    .put(verifyToken, isAdmin, catchAsync(Unarchived));
  router
    .route(ROUTES_PAYMENTMODE.destroy)
    .delete(verifyToken, isRoot, catchAsync(Destroy));
};
