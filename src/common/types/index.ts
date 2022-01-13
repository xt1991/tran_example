export type Nullable<T> = T | null;
export interface IMongoBase {
  _id?: string;
  createdAt: Date;
  updatedAt: Date;
}
