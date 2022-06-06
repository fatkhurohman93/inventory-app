import { Router } from 'express';
import {
  FindAll,
  Update,
  UpdatePassword,
  FindOne,
  Destroy,
  Archived,
  Unarchived,
} from '@controllers/user.controller';
import { catchAsync } from '@utils/index';
import { ROUTES, ROUTES_USER } from '@interfaces/index';
import {
  verifyToken,
  isRoot,
  isUser,
  isAdmin,
} from '@api/middlewares/jwt/auth.jwt';

const router = Router();

export default (app: Router) => {
  app.use(ROUTES.user, router);
  router
    .route(ROUTES_USER.findAll)
    .post(verifyToken, isRoot, catchAsync(FindAll));
  router.route(ROUTES_USER.update).put(verifyToken, isUser, catchAsync(Update));
  router
    .route(ROUTES_USER.updatePassword)
    .put(verifyToken, isUser, catchAsync(UpdatePassword));
  router
    .route(ROUTES_USER.findOne)
    .post(verifyToken, isUser, catchAsync(FindOne));
  router
    .route(ROUTES_USER.archived)
    .put(verifyToken, isAdmin, catchAsync(Archived));
  router
    .route(ROUTES_USER.unarchived)
    .put(verifyToken, isAdmin, catchAsync(Unarchived));
  router
    .route(ROUTES_USER.destroy)
    .delete(verifyToken, isRoot, catchAsync(Destroy));
};
