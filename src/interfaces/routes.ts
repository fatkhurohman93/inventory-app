export enum ROUTES {
  apiPrefix = '/api',
  rootPath = '/',
  clearDB = '/clear-db',
  status = '/status',
  public = '../../public',
  auth = '/auth',
  user = '/user',
  product = '/product',
  category = '/category',
  supplier = '/supplier',
  payment_mode = '/payment-mode',
  sales_master = '/sales-master',
  sales_detail = '/sales-detail',
}

export enum ROUTES_AUTH {
  signUp = '/signup',
  signIn = '/signin',
}

export enum ROUTES_USER {
  findAll = '/findall',
  findOne = '/findone/:userName',
  update = '/update/:userName',
  updatePassword = '/update-password',
  archived = '/archived/:userName',
  destroy = '/destroy/:userName',
  unarchived = '/unarchived/:userName',
}

export enum ROUTES_CRUD {
  create = '/create',
  bulkCreate = '/bulk-create',
  findAll = '/findall',
  findOne = '/findone/:id',
  update = '/update/:id',
  destroy = '/destroy/:id',
  archived = '/archived/:id',
  unarchived = '/unarchived/:id',
}