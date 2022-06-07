import { Common } from './common.interface';

export interface Users extends Common {
  [USER_ATTRIBUTES.id]?: number | string;
  [USER_ATTRIBUTES.userName]: string;
  [USER_ATTRIBUTES.name]: string;
  [USER_ATTRIBUTES.image]?: string;
  [USER_ATTRIBUTES.imageName]?: string;
  [USER_ATTRIBUTES.email]: string;
  [USER_ATTRIBUTES.password]: string;
  [USER_ATTRIBUTES.flagRoles]: number;
  [USER_ATTRIBUTES.oldPassword]?: string;
  [USER_ATTRIBUTES.newPassword]?: string;
}

export enum USER_ATTRIBUTES {
  id = 'id',
  userName = 'userName',
  name = 'name',
  image = 'image',
  imageName = 'imageName',
  email = 'email',
  password = 'password',
  flagRoles = 'flagRoles',
  oldPassword = 'oldPassword',
  newPassword = 'newPassword',
  anonymous = 'anonymous',
}

export enum USER_ROLES {
  ROOT = 1,
  ADMIN = 2,
  USER = 4,
}

export enum USER_ROLES_NAME {
  ROOT = 'ROLE_ROOT',
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
}

export type USERNAME = string;

export type PASSWORD = string;
