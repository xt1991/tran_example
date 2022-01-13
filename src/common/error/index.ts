import { AppError } from './error';
import { errorTranslator } from './error.translator';
import { displayErrorsDescription } from './error.util';

const error = {
  AppError,
  displayErrorsDescription,
  errorTranslator
};

export * from './error.interface';
export default error;
