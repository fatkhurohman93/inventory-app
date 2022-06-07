import { Common } from './common.interface';

export interface Suppliers extends Common {
  [SUPPLIER_ATTRIBUTES.id]?: number | string;
  [SUPPLIER_ATTRIBUTES.name]: string;
  [SUPPLIER_ATTRIBUTES.description]?: string;
  [SUPPLIER_ATTRIBUTES.code]: string;
  [SUPPLIER_ATTRIBUTES.image]?: string;
  [SUPPLIER_ATTRIBUTES.imageName]?: string;
  [SUPPLIER_ATTRIBUTES.phone]: string;
  [SUPPLIER_ATTRIBUTES.whatsapp]: string;
  [SUPPLIER_ATTRIBUTES.email]: string;
  [SUPPLIER_ATTRIBUTES.facebook]: string;
  [SUPPLIER_ATTRIBUTES.instagram]: string;
  [SUPPLIER_ATTRIBUTES.twitter]: string;
  [SUPPLIER_ATTRIBUTES.address]: string;
}

export enum SUPPLIER_ATTRIBUTES {
  id = 'id',
  name = 'name',
  description = 'description',
  code = 'code',
  image = 'image',
  imageName = 'imageName',
  phone = 'phone',
  whatsapp = 'whatsapp',
  email = 'email',
  facebook = 'facebook',
  instagram = 'instagram',
  twitter = 'twitter',
  address = 'address',
}
