import { Common } from './common.interface';

export interface SalesMasters extends Common {
  [SALES_MASTER_ATTRIBUTES.id]?: number | string;
  [SALES_MASTER_ATTRIBUTES.name]: string;
  [SALES_MASTER_ATTRIBUTES.description]?: string;
  [SALES_MASTER_ATTRIBUTES.code]: string;
  [SALES_MASTER_ATTRIBUTES.transDate]: Date | string;
  [SALES_MASTER_ATTRIBUTES.notes]: string;
  [SALES_MASTER_ATTRIBUTES.subTotal]: number;
  [SALES_MASTER_ATTRIBUTES.discount]: number;
  [SALES_MASTER_ATTRIBUTES.tax]: number;
  [SALES_MASTER_ATTRIBUTES.deliveryFee]: number;
  [SALES_MASTER_ATTRIBUTES.otherFee]: number;
  [SALES_MASTER_ATTRIBUTES.otherFee2]: number;
  [SALES_MASTER_ATTRIBUTES.salesTotal]: number;
  [SALES_MASTER_ATTRIBUTES.paymentModeID]: number;
  [SALES_MASTER_ATTRIBUTES.paymentModeName]: string;
  [SALES_MASTER_ATTRIBUTES.customerName]: string;
  [SALES_MASTER_ATTRIBUTES.customerPhone]: string;
  [SALES_MASTER_ATTRIBUTES.customerEmail]: string;
  [SALES_MASTER_ATTRIBUTES.purchasedStatus]: boolean;
  [SALES_MASTER_ATTRIBUTES.purchasedTime]: Date | string;
}

export enum SALES_MASTER_ATTRIBUTES {
  id = 'id',
  name = 'name',
  description = 'description',
  code = 'code',
  transDate = 'transDate',
  notes = 'notes',
  subTotal = 'subTotal',
  discount = 'discount',
  tax = 'tax',
  deliveryFee = 'deliveryFee',
  otherFee = 'otherFee',
  otherFee2 = 'otherFee2',
  salesTotal = 'salesTotal',
  paymentModeID = 'paymentModeID',
  paymentModeName = 'paymentModeName',
  customerName = 'customerName',
  customerPhone = 'customerPhone',
  customerEmail = 'customerEmail',
  purchasedStatus = 'purchasedStatus',
  purchasedTime = 'purchasedTime',
}
