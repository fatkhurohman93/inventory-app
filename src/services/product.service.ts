import { models } from '@models/index';
import logger from '@loaders/logger';
import { BadRequest } from '@utils/appError';
import {
  getPagination,
  getPagingData,
  filterByName,
  filterAny,
  base64ToImage,
  catchError,
  LANG,
  dateLocal,
} from '@utils/index';
import {
  USERNAME,
  USER_ATTRIBUTES,
  MODEL_NAME,
  FindAllParams,
  ID,
  ARCHIVING_STATUS,
  Products,
  SELECTED_ATTRIBUTES,
} from '@interfaces/index';
import { sequelize } from '@models/index';

const { and } = sequelize;
const { products, suppliers, categories } = models;

export const create = async (data: Products, whoIsAccess: USERNAME) => {
  try {
    if (!data.name) throw new BadRequest(LANG.error.wrong_parameter);

    logger.info(LANG.logger.creating(MODEL_NAME.product));

    const image = data.image
      ? base64ToImage(
          data.image,
          data.imageName || LANG.no_name,
          LANG.folderName.product
        )
      : LANG.empty;

    const dateParameter = dateLocal();
    const createdBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    const result = await products.create({
      ...data,
      ...dateParameter,
      image,
      createdBy,
      archived: false,
    });

    logger.info(LANG.logger.created(MODEL_NAME.product, result.toJSON().id));

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const findAll = async (params: FindAllParams) => {
  try {
    const { page, size, name, archived, categoryID, supplierID } = params;
    const { limit, offset } = getPagination(page, size);

    logger.info(LANG.logger.fetching_all(MODEL_NAME.product));

    const result = await products.findAndCountAll({
      where: and(
        filterByName(name),
        filterAny({ archived }),
        filterAny({ categoryID }),
        filterAny({ supplierID })
      ),
      include: [
        { model: categories, attributes: SELECTED_ATTRIBUTES.CATEGORY },
        { model: suppliers, attributes: SELECTED_ATTRIBUTES.SUPPLIER },
      ],
      limit,
      offset,
    });

    const finalResult = getPagingData(result, limit, page);

    logger.info(
      LANG.logger.fetching_all_success(
        finalResult.totalItems,
        MODEL_NAME.product
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

    logger.info(LANG.logger.fetching_one(id, MODEL_NAME.product));

    const result = await products.findOne({
      where: { id },
      include: [
        { model: categories, attributes: SELECTED_ATTRIBUTES.CATEGORY },
        { model: suppliers, attributes: SELECTED_ATTRIBUTES.SUPPLIER },
      ],
    });

    if (!result) {
      throw new BadRequest(LANG.error.model_not_found(MODEL_NAME.product));
    }

    logger.info(LANG.logger.fetching_one_success(id, MODEL_NAME.product));

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const update = async (data: Products, whoIsAccess: USERNAME, id: ID) => {
  try {
    if (!id) {
      throw new BadRequest(LANG.error.wrong_id);
    }

    logger.info(LANG.logger.updating(id, MODEL_NAME.product));

    const { lastUpdatedTime } = dateLocal();
    const lastUpdatedBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    const image = data.image
      ? base64ToImage(
          data.image,
          data.imageName || LANG.no_name,
          LANG.folderName.user
        )
      : LANG.empty;

    const result = await products.update(
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
        ? LANG.logger.archiving(id, MODEL_NAME.product)
        : LANG.logger.unarchiving(id, MODEL_NAME.product)
    );

    const result = await products.update(
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
      MODEL_NAME.product
    );
    const UNARCHIVED_SUCCESS = LANG.logger.unarchiving_success(
      id,
      MODEL_NAME.product
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

    const result = await products.destroy({ where: { id } });

    if (!result) {
      throw new BadRequest(LANG.error.no_data_deleted);
    }

    logger.info(LANG.deleted(result));

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};
