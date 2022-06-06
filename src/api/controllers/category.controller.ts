import { Response, Request, NextFunction } from 'express';
import * as Category from '@services/category.service';
import { Categories } from '@interfaces/index';
import { LANG } from '@utils/index';
import { FindAllParams } from '@interfaces/index';

export const Create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as Categories;
  const whoIsAccess = req.headers.userName as string;

  const result = await Category.create(data, whoIsAccess);

  res.status(200).json({ message: LANG.success, data: result });
};

export const FindAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params: FindAllParams = req.body;

  const result = await Category.findAll(params);

  res.status(200).json({ message: LANG.success, data: result });
};

export const FindOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const result = await Category.findOne(id);

  res.status(200).json({ message: LANG.success, data: result });
};

export const Update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as Categories;
  const { id } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await Category.update(data, whoIsAccess, id);

  res.status(200).json({ message: LANG.success, data: result });
};

export const Archived = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await Category.archived(whoIsAccess, id);

  res.status(200).json({ message: LANG.success, data: result });
};
