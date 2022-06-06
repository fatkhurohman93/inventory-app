export * from './users.interface';
export * from './lang';
export * from './config';
export * from './routes';
export * from './products.interface';
export * from './categories.interface';
export * from './suppliers.interface';
export * from './modelName.interface';
export * from './common.interface';

export interface IData {
  count: number;
  rows: object[];
}

export interface FindAllParams {
  name: string;
  size: number;
  page: number;
  archived?: boolean;
  categoryID?: number;
  supplierID?: number;
}

export type ID = string | number;
