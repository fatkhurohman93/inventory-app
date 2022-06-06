export interface Common {
  createdTime: string | Date;
  createdDate: string | Date;
  year: number;
  month: number;
  lastUpdatedTime: string | Date;
  createdBy: string;
  lastUpdatedBy: string;
  archived: boolean;
}

export enum ARCHIVING_STATUS {
  archived = 'archived',
  unarchived = 'unarchived',
}
