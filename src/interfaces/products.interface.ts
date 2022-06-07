import { Common } from './common.interface';

export interface Products extends Common {
  [PRODUCT_ATTRIBUTES.id]?: number | string;
  [PRODUCT_ATTRIBUTES.name]: string;
  [PRODUCT_ATTRIBUTES.description]?: string;
  [PRODUCT_ATTRIBUTES.code]: string;
  [PRODUCT_ATTRIBUTES.image]?: string;
  [PRODUCT_ATTRIBUTES.imageName]?: string;
  [PRODUCT_ATTRIBUTES.stock]: number;
  [PRODUCT_ATTRIBUTES.unit]: string;
  [PRODUCT_ATTRIBUTES.price]: number;
  [PRODUCT_ATTRIBUTES.sellPrice]: number;
  [PRODUCT_ATTRIBUTES.productDiscount]: number;
  [PRODUCT_ATTRIBUTES.productTax]: number;
  [PRODUCT_ATTRIBUTES.active]: boolean;
  [PRODUCT_ATTRIBUTES.categoryID]: number;
  [PRODUCT_ATTRIBUTES.supplierID]: number;
}

export enum PRODUCT_ATTRIBUTES {
  id = 'id',
  name = 'name',
  description = 'description',
  code = 'code',
  image = 'image',
  imageName = 'imageName',
  stock = 'stock',
  unit = 'unit',
  price = 'price',
  sellPrice = 'sellPrice',
  productDiscount = 'productDiscount',
  productTax = 'productTax',
  active = 'active',
  categoryID = 'categoryID',
  supplierID = 'supplierID',
}
