import { models } from '@models/index';
import logger from '@loaders/logger';
import { BadRequest } from '@utils/appError';
import {
  getPagination,
  getPagingData,
  filterByName,
  filterAny,
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
  ProductKeywords,
} from '@interfaces/index';
import { sequelize } from '@models/index';

const { and } = sequelize;
const { productKeywords, products } = models;

export const create = async (data: ProductKeywords, whoIsAccess: USERNAME) => {
  try {
    if (!data.name) throw new BadRequest(LANG.error.wrong_parameter);

    logger.info(LANG.logger.creating(MODEL_NAME.product_keyword));

    const dateParameter = dateLocal();
    const createdBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    const result = await productKeywords.create({
      ...data,
      ...dateParameter,
      createdBy,
      archived: false,
    });

    logger.info(
      LANG.logger.created(MODEL_NAME.product_keyword, result.toJSON().id)
    );

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const findAll = async (params: FindAllParams) => {
  try {
    const { page, size, name, archived, productID } = params;
    const { limit, offset } = getPagination(page, size);

    logger.info(LANG.logger.fetching_all(MODEL_NAME.product_keyword));

    const result = await productKeywords.findAndCountAll({
      where: and(
        filterByName(name),
        filterAny({ archived }),
        filterAny({ productID })
      ),
      include: [{ model: products }],
      limit,
      offset,
    });

    const finalResult = getPagingData(result, limit, page);

    logger.info(
      LANG.logger.fetching_all_success(
        finalResult.totalItems,
        MODEL_NAME.product_keyword
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

    logger.info(LANG.logger.fetching_one(id, MODEL_NAME.product_keyword));

    const result = await productKeywords.findOne({
      where: { id },
      include: [{ model: products }],
    });

    if (!result) {
      throw new BadRequest(
        LANG.error.model_not_found(MODEL_NAME.product_keyword)
      );
    }

    logger.info(
      LANG.logger.fetching_one_success(id, MODEL_NAME.product_keyword)
    );

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const update = async (
  data: ProductKeywords,
  whoIsAccess: USERNAME,
  id: ID
) => {
  try {
    if (!id) {
      throw new BadRequest(LANG.error.wrong_id);
    }

    logger.info(LANG.logger.updating(id, MODEL_NAME.product_keyword));

    const { lastUpdatedTime } = dateLocal();
    const lastUpdatedBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    const result = await productKeywords.update(
      { ...data, lastUpdatedBy, lastUpdatedTime },
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
        ? LANG.logger.archiving(id, MODEL_NAME.product_keyword)
        : LANG.logger.unarchiving(id, MODEL_NAME.product_keyword)
    );

    const result = await productKeywords.update(
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
      MODEL_NAME.product_keyword
    );
    const UNARCHIVED_SUCCESS = LANG.logger.unarchiving_success(
      id,
      MODEL_NAME.product_keyword
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

    logger.info(LANG.logger.deleting(id, MODEL_NAME.product_keyword));

    const result = await productKeywords.destroy({ where: { id } });

    if (!result) {
      throw new BadRequest(LANG.error.no_data_deleted);
    }

    logger.info(LANG.deleted(result));

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};
