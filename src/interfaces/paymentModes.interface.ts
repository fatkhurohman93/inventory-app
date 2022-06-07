import { Common } from './common.interface';

export interface PaymentModes extends Common {
  id?: number | string;
  name: string;
  description?: string;
}

export enum PAYMENT_MODE_ATTRIBUTES {
  id = 'id',
  name = 'name',
  description = 'description',
  createdTime = 'createdTime',
  createdDate = 'createdDate',
  year = 'year',
  month = 'month',
  lastUpdatedTime = 'lastUpdatedTime',
  createdBy = 'createdBy',
  lastUpdatedBy = 'lastUpdatedBy',
  archived = 'archived',
}
