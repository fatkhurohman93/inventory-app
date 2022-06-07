import { Common } from './common.interface';

export interface SalesMasters extends Common {
  id?: number | string;
  name: string;
  description?: string;
  code: string;
  transDate: Date | string;
  notes: string;
  subTotal: number;
  discount: number;
  tax: number;
  deliveryFee: number;
  otherFee: number;
  otherFee2: number;
  salesTotal: number;
  paymentModeID: number;
  paymentModeName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  purchasedStatus: boolean;
  purchasedTime: Date | string;
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
  purhaseedTime = 'purchasedTime',
  createdTime = 'createdTime',
  createdDate = 'createdDate',
  year = 'year',
  month = 'month',
  lastUpdatedTime = 'lastUpdatedTime',
  createdBy = 'createdBy',
  lastUpdatedBy = 'lastUpdatedBy',
  archived = 'archived',
}
