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
  Categories,
  FindAllParams,
  USERNAME,
  USER_ATTRIBUTES,
  ID,
  MODEL_NAME,
  ARCHIVING_STATUS,
} from '@interfaces/index';
import { LANG, dateLocal } from '@utils/index';
import { sequelize } from '@models/index';
const { and } = sequelize;

const { categories } = models;

export const create = async (data: Categories, whoIsAccess: USERNAME) => {
  try {
    if (!data.name) {
      throw new BadRequest(LANG.error.wrong_parameter);
    }

    logger.info(LANG.logger.creating_category);

    const image = data.image
      ? base64ToImage(
          data.image,
          data.imageName || LANG.no_name,
          LANG.folderName.category
        )
      : LANG.empty;

    const dateParameter = dateLocal();
    const createdBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    const result = await categories.create({
      ...data,
      ...dateParameter,
      image,
      createdBy,
      archived: false,
    });

    logger.info(LANG.logger.category_created);

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const findAll = async (params: FindAllParams) => {
  try {
    const { page, size, name, archived } = params;
    const { limit, offset } = getPagination(page, size);

    logger.info(LANG.logger.fetching_categories);

    const result = await categories.findAndCountAll({
      where: and(
        filterByName(name),
        archived !== undefined ? { archived } : {}
      ),
      limit,
      offset,
    });

    const finalResult = getPagingData(result, limit, page);

    logger.info(LANG.logger.result_get_categories(finalResult.totalItems));

    return finalResult;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const findOne = async (id: ID) => {
  try {
    if (!id) {
      throw new BadRequest(LANG.error.wrong_id);
    }

    logger.info(LANG.logger.fetching_category(id));

    const result = await categories.findOne({ where: { id } });

    if (!result) {
      throw new BadRequest(LANG.error.category_not_found);
    }

    logger.info(LANG.logger.fetch_category_success(id));

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const update = async (
  data: Categories,
  whoIsAccess: USERNAME,
  id: ID
) => {
  try {
    if (!id) {
      throw new BadRequest(LANG.error.wrong_id);
    }

    logger.info(LANG.logger.updating_category(id));

    const { lastUpdatedTime } = dateLocal();
    const lastUpdatedBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    const image = data.image
      ? base64ToImage(
          data.image,
          data.imageName || LANG.no_name,
          LANG.folderName.user
        )
      : LANG.empty;

    const result = await categories.update(
      { ...data, image, lastUpdatedBy, lastUpdatedTime },
      { where: { id } }
    );

    if (!result) {
      throw new BadRequest(LANG.error.no_data_updated);
    }

    logger.info(LANG.updated(result[0]));

    return LANG.updated(result[0]);
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const archivedAndUnarchived = async (
  whoIsAccess: USERNAME,
  id: ID,
  status: ARCHIVING_STATUS
) => {
  try {
    const { lastUpdatedTime } = dateLocal();
    const lastUpdatedBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    logger.info(
      ARCHIVING_STATUS.archived
        ? LANG.logger.archiving(id, MODEL_NAME.category)
        : LANG.logger.unarchiving(id, MODEL_NAME.category)
    );

    const result = await categories.update(
      {
        archived: status === ARCHIVING_STATUS.archived,
        lastUpdatedTime,
        lastUpdatedBy,
      },
      { where: { id } }
    );

    if (!result[0]) {
      if (status === ARCHIVING_STATUS.archived)
        throw new BadRequest(LANG.error.failed_to_archived);
      throw new BadRequest(LANG.error.failed_to_unarchived);
    }

    const ARCHIVED_SUCCESS = LANG.logger.archiving_success(id, MODEL_NAME.user);
    const UNARCHIVED_SUCCESS = LANG.logger.unarchiving_success(
      id,
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
