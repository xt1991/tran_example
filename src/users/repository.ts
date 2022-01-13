import { IUser } from './interface';
import { UserDocument, UserModel } from './model';

const create = async (user: IUser): Promise<UserDocument> => {
  return UserModel.create(user);
};

const get = async (): Promise<UserDocument[]> => {
  return UserModel.find().exec();
};
const getById = async (id: string): Promise<UserDocument | null> => {
  return UserModel.findById(id).exec();
};

const findOneAndUpdate = async (
  id: string,
  dataToUpdate: Partial<IUser>,
  isForceCreate = false
): Promise<UserDocument | null> => {
  const res = await UserModel.findOneAndUpdate({ _id: id }, dataToUpdate, {
    upsert: isForceCreate,
    new: true
  });
  return res;
};

const userRepository = {
  create,
  get,
  getById,
  findOneAndUpdate
};

export default userRepository;
