import { Response, Request, NextFunction } from 'express';
import * as SalesDetail from '@services/salesDetail.service';
import { SalesDetails } from '@interfaces/index';
import { LANG } from '@utils/index';
import { FindAllParams, ARCHIVING_STATUS } from '@interfaces/index';

export const Create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as SalesDetails;
  const whoIsAccess = req.headers.userName as string;

  const result = await SalesDetail.create(data, whoIsAccess);

  res.status(200).json({ message: LANG.success, data: result });
};

export const BulkCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as SalesDetails[];
  const whoIsAccess = req.headers.userName as string;

  const result = await Promise.all(
    data.map(async (category: SalesDetails) => {
      const response = await SalesDetail.create(category, whoIsAccess);
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

  const result = await SalesDetail.findAll(params);

  res.status(200).json({ message: LANG.success, data: result });
};

export const FindOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const result = await SalesDetail.findOne(id);

  res.status(200).json({ message: LANG.success, data: result });
};

export const Update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as SalesDetails;
  const { id } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await SalesDetail.update(data, whoIsAccess, id);

  res.status(200).json({ message: LANG.success, data: result });
};

export const Archived = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await SalesDetail.archivedAndUnarchived(
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

  const result = await SalesDetail.archivedAndUnarchived(
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

  const result = await SalesDetail.destroy(id);

  res.status(200).json({ message: LANG.success, data: LANG.deleted(result) });
};
