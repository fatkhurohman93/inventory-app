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
  Suppliers,
  USERNAME,
  USER_ATTRIBUTES,
  MODEL_NAME,
  FindAllParams,
  ID,
  ARCHIVING_STATUS,
} from '@interfaces/index';
import { LANG, dateLocal } from '@utils/index';
import { sequelize } from '@models/index';

const { and } = sequelize;
const { suppliers } = models;

export const create = async (data: Suppliers, whoIsAccess: USERNAME) => {
  try {
    if (!data.name) throw new BadRequest(LANG.error.wrong_parameter);

    logger.info(LANG.logger.creating(MODEL_NAME.supplier));

    const image = data.image
      ? base64ToImage(
          data.image,
          data.imageName || LANG.no_name,
          LANG.folderName.supplier
        )
      : LANG.empty; 

    const dateParameter = dateLocal();
    const createdBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    const result = await suppliers.create({
      ...data,
      ...dateParameter,
      image,
      createdBy,
      archived: false,
    });

    logger.info(LANG.logger.created(MODEL_NAME.supplier, result.toJSON().id));

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const findAll = async (params: FindAllParams) => {
  try {
    const { page, size, name, archived } = params;
    const { limit, offset } = getPagination(page, size);

    logger.info(LANG.logger.fetching_all(MODEL_NAME.supplier));

    const result = await suppliers.findAndCountAll({
      where: and(
        filterByName(name),
        archived !== undefined ? { archived } : {}
      ),
      limit,
      offset,
    });

    const finalResult = getPagingData(result, limit, page);

    logger.info(
      LANG.logger.fetching_all_success(
        finalResult.totalItems,
        MODEL_NAME.supplier
      )
    );

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

    logger.info(LANG.logger.fetching_one(id, MODEL_NAME.supplier));

    const result = await suppliers.findOne({ where: { id } });

    if (!result) {
      throw new BadRequest(LANG.error.model_not_found(MODEL_NAME.supplier));
    }

    logger.info(LANG.logger.fetching_one_success(id, MODEL_NAME.supplier));

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const update = async (
  data: Suppliers,
  whoIsAccess: USERNAME,
  id: ID
) => {
  try {
    if (!id) {
      throw new BadRequest(LANG.error.wrong_id);
    }

    logger.info(LANG.logger.updating(id, MODEL_NAME.supplier));

    const { lastUpdatedTime } = dateLocal();
    const lastUpdatedBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    const image = data.image
      ? base64ToImage(
          data.image,
          data.imageName || LANG.no_name,
          LANG.folderName.user
        )
      : LANG.empty;

    const result = await suppliers.update(
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
      status === ARCHIVING_STATUS.archived
        ? LANG.logger.archiving(id, MODEL_NAME.supplier)
        : LANG.logger.unarchiving(id, MODEL_NAME.supplier)
    );

    const result = await suppliers.update(
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

    const ARCHIVED_SUCCESS = LANG.logger.archiving_success(
      id,
      MODEL_NAME.supplier
    );
    const UNARCHIVED_SUCCESS = LANG.logger.unarchiving_success(
      id,
      MODEL_NAME.supplier
    );

    const ARCHIVED_OR_UNARCHIVED =
      status === ARCHIVING_STATUS.archived
        ? ARCHIVED_SUCCESS
        : UNARCHIVED_SUCCESS;

    logger.info(ARCHIVED_OR_UNARCHIVED);

    return ARCHIVED_OR_UNARCHIVED;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const destroy = async (id: ID) => {
  try {
    if (!id) throw new BadRequest(LANG.error.wrong_parameter);

    logger.info(LANG.logger.deleting(id, MODEL_NAME.product));

    const result = await suppliers.destroy({ where: { id } });

    if (!result) {
      throw new BadRequest(LANG.error.no_data_deleted);
    }

    logger.info(LANG.deleted(result));

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};
