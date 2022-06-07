import { Common } from './common.interface';

export interface ProductKeywords extends Common {
  [PRODUCT_KEYWORD_ATTRIBUTES.id]?: number | string;
  [PRODUCT_KEYWORD_ATTRIBUTES.productID]: number;
  [PRODUCT_KEYWORD_ATTRIBUTES.name]: string;
  [PRODUCT_KEYWORD_ATTRIBUTES.description]: string;
}

export enum PRODUCT_KEYWORD_ATTRIBUTES {
  id = 'id',
  name = 'name',
  description = 'description',
  productID = 'productID',
}
