import { models } from '@models/index';
import logger from '@loaders/logger';
import { BadRequest } from '@utils/appError';
import {
  getPagination,
  getPagingData,
  filterByName,
  base64ToImage,
  catchError,
} from '@utils/index';
import {
  Users,
  FindAllParams,
  USERNAME,
  ID,
  PASSWORD,
  USER_ATTRIBUTES,
  MODEL_NAME,
  ARCHIVING_STATUS,
} from '@interfaces/index';
import bcrypt from 'bcrypt';
import { LANG, dateLocal } from '@utils/index';
import { sequelize } from '@models/index';
const { and } = sequelize;

const { users } = models;

export const findAll = async (params: FindAllParams) => {
  try {
    const { page, size, name, archived } = params;
    const { limit, offset } = getPagination(page, size);

    logger.info(LANG.logger.fetching_all(MODEL_NAME.user));

    const result = await users.findAndCountAll({
      where: and(
        filterByName(name),
        archived !== undefined ? { archived } : {}
      ),
      attributes: { exclude: [USER_ATTRIBUTES.password] },
      limit,
      offset,
    });

    const finalResult = getPagingData(result, limit, page);

    logger.info(
      LANG.logger.fetching_all_success(finalResult.totalItems, MODEL_NAME.user)
    );

    return finalResult;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const findOne = async (userName: USERNAME) => {
  try {
    if (!userName) {
      throw new BadRequest(LANG.error.wrong_username);
    }

    logger.info(LANG.logger.fetching_one(userName, MODEL_NAME.user));

    const result = await users.findOne({
      where: { userName },
      attributes: { exclude: [USER_ATTRIBUTES.password] },
    });

    if (!result) {
      throw new BadRequest(LANG.error.model_not_found(MODEL_NAME.user));
    }

    logger.info(LANG.logger.fetching_one_success(userName, MODEL_NAME.user));

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const update = async (
  data: Users,
  whoIsAccess: USERNAME,
  userName: USERNAME
) => {
  try {
    if (!userName) {
      throw new BadRequest(LANG.error.wrong_username);
    }

    const { lastUpdatedTime } = dateLocal();
    const lastUpdatedBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    logger.info(LANG.logger.updating(userName, MODEL_NAME.user));

    const { name, email, flagRoles } = data;

    const image = data.image
      ? base64ToImage(
          data.image,
          data.imageName || LANG.no_name,
          LANG.folderName.user
        )
      : LANG.empty;

    const result = await users.update(
      { name, email, image, flagRoles, lastUpdatedBy, lastUpdatedTime },
      { where: { userName } }
    );

    if (!result[0]) {
      throw new BadRequest(LANG.error.no_data_updated);
    }

    logger.info(LANG.updated(result[0]));

    return LANG.updated(result[0]);
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const checkPassword = async (password: PASSWORD, userName: USERNAME) => {
  try {
    logger.info(LANG.logger.check_password(userName));

    if (!userName || !password) {
      throw new BadRequest(LANG.error.wrong_parameter);
    }

    const userResult = await users.findOne({
      where: { userName },
    });

    if (!userResult) {
      throw new BadRequest(LANG.error.model_not_found(MODEL_NAME.user));
    }

    const userResultToJSON = userResult.toJSON();

    const passwordIsValid = bcrypt.compareSync(
      password,
      userResultToJSON.password
    );

    return {
      passwordIsValid,
      userName: userResultToJSON.userName,
      name: userResultToJSON.name,
      email: userResultToJSON.email,
      flagRoles: userResultToJSON.flagRoles,
    };
  } catch (err) {
    throw err;
  }
};

export const updatePassword = async (
  oldPassword?: PASSWORD,
  newPassword?: PASSWORD,
  userName?: USERNAME
) => {
  try {
    if (!oldPassword || !newPassword || !userName) {
      throw new BadRequest(LANG.error.wrong_parameter);
    }

    const { passwordIsValid } = await checkPassword(oldPassword, userName);

    if (!passwordIsValid) {
      throw new BadRequest(LANG.error.wrong_password);
    }
    const password = bcrypt.hashSync(newPassword, 8);

    const updatePasswordResult = await users.update(
      { password },
      { where: { userName } }
    );

    if (!updatePasswordResult[0]) {
      throw new BadRequest(LANG.error.password_failed_to_update);
    }

    return LANG.password_updated;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const archivedAndUnarchived = async (
  whoIsAccess: USERNAME,
  userName: ID,
  status: ARCHIVING_STATUS
) => {
  try {
    const { lastUpdatedTime } = dateLocal();
    const lastUpdatedBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    logger.info(
      ARCHIVING_STATUS.archived
        ? LANG.logger.archiving(userName, MODEL_NAME.user)
        : LANG.logger.unarchiving(userName, MODEL_NAME.user)
    );

    const result = await users.update(
      {
        archived: status === ARCHIVING_STATUS.archived,
        lastUpdatedTime,
        lastUpdatedBy,
      },
      { where: { userName } }
    );

    if (!result[0]) {
      if (status === ARCHIVING_STATUS.archived)
        throw new BadRequest(LANG.error.failed_to_archived);
      throw new BadRequest(LANG.error.failed_to_unarchived);
    }

    const ARCHIVED_SUCCESS = LANG.logger.archiving_success(
      userName,
      MODEL_NAME.user
    );
    const UNARCHIVED_SUCCESS = LANG.logger.unarchiving_success(
      userName,
      MODEL_NAME.user
    );

    if (status === ARCHIVING_STATUS.archived) {
      logger.info(ARCHIVED_SUCCESS);

      return ARCHIVED_SUCCESS;
    } else {
      logger.info(UNARCHIVED_SUCCESS);

      return UNARCHIVED_SUCCESS;
    }
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const destroy = async (userName: USERNAME) => {
  try {
    if (!userName) throw new BadRequest(LANG.error.wrong_username);

    logger.info(LANG.logger.deleting(userName, MODEL_NAME.user));

    const result = await users.destroy({ where: { userName } });

    if (!result) {
      throw new BadRequest(LANG.error.no_data_deleted);
    }

    logger.info(LANG.deleted(result));

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};
