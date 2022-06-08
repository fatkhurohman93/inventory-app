export * from './users.interface';
export * from './lang';
export * from './config';
export * from './routes';
export * from './products.interface';
export * from './categories.interface';
export * from './suppliers.interface';
export * from './paymentModes.interface';
export * from './salesMasters.interface';
export * from './salesDetails.interface';
export * from './productKeywords.interface';
export * from './modelName.interface';
export * from './common.interface';
export * from './selectedAttributes';

export interface IData {
  count: number;
  rows: object[];
}

export interface OrderParams {
  orderOption: string;
  orderType: string;
}

export interface FindAllParams {
  name: string;
  size: number;
  page: number;
  archived?: boolean;
  categoryID?: number;
  supplierID?: number;
  paymentModeID?: number;
  salesMasterID?: number;
  productID?: number;
  orderParams?: OrderParams;
}

export enum SortingOption {
  name = 'name',
  userName = 'userName',
  stock = 'stock',
  price = 'price',
  sellPrice = 'sellPrice',
  createdTime = 'createdTime',
  quantity = 'quantity',
  transDate = 'transDate',
  subTotal = 'subTotal',
  salesTotal = 'salesTotal',
}

export enum SortingType {
  ASC = 'asc',
  DESC = 'desc',
}

export type OrderBy = [string, string];

export type ID = string | number;
