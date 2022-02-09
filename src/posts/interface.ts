import { IMongoBase } from '../common/types';

export enum postStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
export interface IPost extends Partial<IMongoBase> {
  title: string;
  intro: string;
  author: string;
  content: string;
  tag: string[];
  status: postStatus;
}
