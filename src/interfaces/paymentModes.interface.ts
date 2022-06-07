import { Common } from './common.interface';

export interface PaymentModes extends Common {
  [PAYMENT_MODE_ATTRIBUTES.id]?: number | string;
  [PAYMENT_MODE_ATTRIBUTES.name]: string;
  [PAYMENT_MODE_ATTRIBUTES.description]?: string;
}

export enum PAYMENT_MODE_ATTRIBUTES {
  id = 'id',
  name = 'name',
  description = 'description',
}
