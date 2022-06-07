import { Common } from './common.interface';

export interface SalesDetails extends Common {
  [SALES_DETAIL_ATTRIBUTES.id]?: number | string;
  [SALES_DETAIL_ATTRIBUTES.name]: string;
  [SALES_DETAIL_ATTRIBUTES.description]?: string;
  [SALES_DETAIL_ATTRIBUTES.code]: string;
  [SALES_DETAIL_ATTRIBUTES.salesMasterID]: number;
  [SALES_DETAIL_ATTRIBUTES.productID]: number;
  [SALES_DETAIL_ATTRIBUTES.productName]: string;
  [SALES_DETAIL_ATTRIBUTES.transDate]: Date | string;
  [SALES_DETAIL_ATTRIBUTES.notes]: string;
  [SALES_DETAIL_ATTRIBUTES.quantity]: number;
  [SALES_DETAIL_ATTRIBUTES.unit]: string;
  [SALES_DETAIL_ATTRIBUTES.sellPrice]: number;
  [SALES_DETAIL_ATTRIBUTES.discount]: number;
  [SALES_DETAIL_ATTRIBUTES.tax]: number;
}

export enum SALES_DETAIL_ATTRIBUTES {
  id = 'id',
  name = 'name',
  description = 'description',
  code = 'code',
  salesMasterID = 'salesMasterID',
  productID = 'productID',
  productName = 'productName',
  transDate = 'transDate',
  notes = 'notes',
  quantity = 'quantity',
  unit = 'unit',
  sellPrice = 'sellPrice',
  discount = 'discount',
  tax = 'tax',
}
