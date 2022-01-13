import { IMongoBase } from '../common/types';

export enum userStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
export interface IUser extends Partial<IMongoBase> {
  fullName: string;
  email: string;
  dob: string;
  fb?: string;
  tw?: string;
  status: userStatus;
}
