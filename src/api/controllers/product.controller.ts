import { Response, Request, NextFunction } from 'express';
import * as Product from '@services/product.service';
import { Products } from '@interfaces/index';
import { LANG } from '@utils/index';
import { FindAllParams, ARCHIVING_STATUS } from '@interfaces/index';

export const Create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as Products;
  const whoIsAccess = req.headers.userName as string;

  const result = await Product.create(data, whoIsAccess);

  res.status(200).json({ message: LANG.success, data: result });
};

export const BulkCreate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body as Products[];
    const whoIsAccess = req.headers.userName as string;
  
    const result = await Promise.all(
      data.map(async (product: Products) => {
        const response = await Product.create(product , whoIsAccess);
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

  const result = await Product.findAll(params);

  res.status(200).json({ message: LANG.success, data: result });
};

export const FindOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const result = await Product.findOne(id);

  res.status(200).json({ message: LANG.success, data: result });
};

export const Update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as Products;
  const { id } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await Product.update(data, whoIsAccess, id);

  res.status(200).json({ message: LANG.success, data: result });
};

export const Archived = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await Product.archivedAndUnarchived(
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

  const result = await Product.archivedAndUnarchived(
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

  const result = await Product.destroy(id);

  res.status(200).json({ message: LANG.success, data: LANG.deleted(result) });
};
