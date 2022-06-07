import { Response, Request, NextFunction } from 'express';
import * as PaymentMode from '@services/paymentMode.service';
import { PaymentModes } from '@interfaces/index';
import { LANG } from '@utils/index';
import { FindAllParams, ARCHIVING_STATUS } from '@interfaces/index';

export const Create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as PaymentModes;
  const whoIsAccess = req.headers.userName as string;

  const result = await PaymentMode.create(data, whoIsAccess);

  res.status(200).json({ message: LANG.success, data: result });
};

export const BulkCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as PaymentModes[];
  const whoIsAccess = req.headers.userName as string;

  const result = await Promise.all(
    data.map(async (category: PaymentModes) => {
      const response = await PaymentMode.create(category, whoIsAccess);
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

  const result = await PaymentMode.findAll(params);

  res.status(200).json({ message: LANG.success, data: result });
};

export const FindOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const result = await PaymentMode.findOne(id);

  res.status(200).json({ message: LANG.success, data: result });
};

export const Update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as PaymentModes;
  const { id } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await PaymentMode.update(data, whoIsAccess, id);

  res.status(200).json({ message: LANG.success, data: result });
};

export const Archived = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await PaymentMode.archivedAndUnarchived(
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

  const result = await PaymentMode.archivedAndUnarchived(
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

  const result = await PaymentMode.destroy(id);

  res.status(200).json({ message: LANG.success, data: LANG.deleted(result) });
};
