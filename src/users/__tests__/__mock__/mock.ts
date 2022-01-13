import { IUser, userStatus } from '../../interface';

export const userData: IUser = {
  fullName: 'fullName',
  email: 'email',
  dob: new Date().toISOString(),
  fb: '',
  tw: '',
  status: userStatus.ACTIVE
};
