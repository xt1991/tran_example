import { IUser, userStatus } from '../../interface';

export const userData: IUser = {
  fullName: 'fullName',
  email: 'email@gmail.com',
  pass: '$2a$10$2NeNudzVhh3Epw9ab9HTPO1MKpvzE6cN0coJlNmUKlim7vQIz9FXO',
  dob: new Date().toISOString(),
  fb: '',
  tw: '',
  status: userStatus.ACTIVE
};
