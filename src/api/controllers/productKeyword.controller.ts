import { Response, Request, NextFunction } from 'express';
import * as ProductKeyword from '@services/productKeyword.service';
import { ProductKeywords } from '@interfaces/index';
import { LANG } from '@utils/index';
import { FindAllParams, ARCHIVING_STATUS } from '@interfaces/index';

export const Create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as ProductKeywords;
  const whoIsAccess = req.headers.userName as string;

  const result = await ProductKeyword.create(data, whoIsAccess);

  res.status(200).json({ message: LANG.success, data: result });
};

export const BulkCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as ProductKeywords[];
  const whoIsAccess = req.headers.userName as string;

  const result = await Promise.all(
    data.map(async (product: ProductKeywords) => {
      const response = await ProductKeyword.create(product, whoIsAccess);
      return response;
    })
  );

  res.status(200).json({ message: LANG.success, data: result });
};

export const FindAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params: FindAllParams = req.body;

  const result = await ProductKeyword.findAll(params);

  res.status(200).json({ message: LANG.success, data: result });
};

export const FindOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const result = await ProductKeyword.findOne(id);

  res.status(200).json({ message: LANG.success, data: result });
};

export const Update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as ProductKeywords;
  const { id } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await ProductKeyword.update(data, whoIsAccess, id);

  res.status(200).json({ message: LANG.success, data: result });
};

export const Archived = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await ProductKeyword.archivedAndUnarchived(
    whoIsAccess,
    id,
    ARCHIVING_STATUS.archived
  );

  res.status(200).json({ message: LANG.success, data: result });
};

export const Unarchived = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await ProductKeyword.archivedAndUnarchived(
    whoIsAccess,
    id,
    ARCHIVING_STATUS.unarchived
  );

  res.status(200).json({ message: LANG.success, data: result });
};

export const Destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const result = await ProductKeyword.destroy(id);

  res.status(200).json({ message: LANG.success, data: LANG.deleted(result) });
};
