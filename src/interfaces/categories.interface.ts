import { Common } from './common.interface';

export interface Categories extends Common {
  [CATEGORY_ATTRIBUTES.id]?: number | string;
  [CATEGORY_ATTRIBUTES.name]: string;
  [CATEGORY_ATTRIBUTES.description]?: string;
  [CATEGORY_ATTRIBUTES.code]: string;
  [CATEGORY_ATTRIBUTES.image]?: string;
  [CATEGORY_ATTRIBUTES.imageName]?: string;
  [CATEGORY_ATTRIBUTES.productCategoryDiscount]: number;
  [CATEGORY_ATTRIBUTES.productCategoryTax]: number;
}

export enum CATEGORY_ATTRIBUTES {
  id = 'id',
  name = 'name',
  description = 'description',
  code = 'code',
  image = 'image',
  imageName = 'imageName',
  productCategoryDiscount = 'productCategoryDiscount',
  productCategoryTax = 'productCategoryTax',
}
