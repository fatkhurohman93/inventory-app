import { ID } from '@interfaces/index';

export const en = {
  appName: 'Inventory App',
  welcome: 'Welcome to the Inventory App',
  empty: '',
  no_name: 'no-name',
  success: 'Success',
  ok: 'OK',
  err: 'Error',
  updated: (total: number) => {
    return `${total} data ${
      total > 1 ? 'has' : 'have'
    } been updated successfully.`;
  },
  deleted: (total: number) => {
    return `${total} data ${
      total > 1 ? 'has' : 'have'
    } been deleted successfully.`;
  },
  password_updated: 'Password has been updated successfully.',
  setup: {
    connect_to_db: 'Begin database connection...',
    success_connect_to_db: 'Connect to database successfully',
    failed_connect_to_db: (errMessage: string) => {
      return `🔥 failed connect to database, message: ${errMessage}`;
    },
    db_reset: 'Database reset.',
    db_reset_failed: 'Unable to clear the database.',
    cors_message: (origin: string) => {
      return `The CORS policy for this site does not allow access from this ${origin} specified origin`;
    },
    server_listen: (IP: string, port: string | number) => {
      return `🚀 Server listening at http://${IP || 'localhost'}:${port}`;
    },
  },
  error: {
    wrong_parameter: 'Wrong parameter!',
    wrong_password: 'Wrong password!',
    wrong_username: 'Wrong userName!',
    wrong_id: 'Wrong id.',
    password_failed_to_update: 'Password failed to update!',
    no_username_password: 'userName or password cannot be empty!',
    model_not_found: (tableName: string) => {
      return `${tableName} not found!`;
    },
    no_data_updated: 'No data has been updated!',
    no_data_deleted: 'No data has been deleted!',
    http_not_found: (url: string) => {
      return `Page you are looking ${url} not found`;
    },
    jwt_expired: 'JWT expired.',
    no_token_provided: 'No token provided.',
    unauthorized: 'Unauthorized!',
    require_role: (ROLE: string) => {
      return `Require ${ROLE}`;
    },
    failed_to_archived: 'Failed to archived!',
    failed_to_unarchived: 'Failed to unarchived!',
  },
  logger: {
    login: (userName: string) => {
      return `Login Username: ${userName}...`;
    },
    success_login: (userName: string) => {
      return `Username: ${userName} login successfully.`;
    },
    archiving: (id: string | number, tableName: string) => {
      return `Archiving ${tableName}. id: ${id}`;
    },
    archiving_success: (id: string | number, tableName: string) => {
      return `${tableName} with id: ${id} has been archived successfully`;
    },
    unarchiving: (id: string | number, tableName: string) => {
      return `Unarchiving ${tableName}. id: ${id}`;
    },
    unarchiving_success: (id: string | number, tableName: string) => {
      return `id: ${id} from data ${tableName} has been unarchived successfully`;
    },
    check_password: (userName: string) => {
      return `Checking password for ${userName}...`;
    },
    verifying_token: 'Verifying token...',
    token_verified: 'Token verified!',
    verifying_authority: 'Verifying authority...',
    authority_granted: (ROLE: string) => {
      return `Authority granted as ${ROLE}`;
    },
    deleting: (id: string | number, tableName: string) => {
      return `Deleting ${tableName} by id: ${id}...`;
    },
    creating: (tableName: string) => {
      return `Creating ${tableName}...`;
    },
    created: (tableName: string, id?: string | number) => {
      return `${tableName} with id: ${id} has been created successfuly.`;
    },
    fetching_all: (tableName: string) => {
      return `Fetching ${tableName}...`;
    },
    fetching_one: (id: ID, tableName: string) => {
      return `Fetching ${tableName} data by id: ${id}...`;
    },
    fetching_all_success: (total: Number, tableName: string) => {
      return `${total} ${tableName}(s) fetched.`;
    },
    fetching_one_success: (id: ID, tableName: string) => {
      return `${tableName} id: ${id} has been fetched successfully.`;
    },
    updating: (id: ID, tableName: string) => {
      return `Updating ${tableName} data by id: ${id}...`;
    },
  },
  folderName: {
    user: 'user',
    product: 'product',
    supplier: 'supplier',
    category: 'category',
  },
};
