import { ResponseBase } from '../httpResponse';
export enum ERROR_CODE {
  CODE = 'CODE'
}
// this wrapper would be created in every ms, so that we inject the ERROR_CODE enum of that ms
export class HttpResponse<DataType> extends ResponseBase<DataType, ERROR_CODE> {
  constructor() {
    super();
  }
}
