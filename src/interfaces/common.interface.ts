export interface Common {
  [COMMON_ATTRIBUTES.createdTime]: string | Date;
  [COMMON_ATTRIBUTES.createdDate]: string | Date;
  [COMMON_ATTRIBUTES.year]: number;
  [COMMON_ATTRIBUTES.month]: number;
  [COMMON_ATTRIBUTES.lastUpdatedTime]: string | Date;
  [COMMON_ATTRIBUTES.createdBy]: string;
  [COMMON_ATTRIBUTES.lastUpdatedBy]: string;
  [COMMON_ATTRIBUTES.archived]: boolean;
}

export enum ARCHIVING_STATUS {
  archived = 'archived',
  unarchived = 'unarchived',
}

export enum COMMON_ATTRIBUTES {
  createdTime = 'createdTime',
  createdDate = 'createdDate',
  year = 'year',
  month = 'month',
  lastUpdatedTime = 'lastUpdatedTime',
  createdBy = 'createdBy',
  lastUpdatedBy = 'lastUpdatedBy',
  archived = 'archived',
}