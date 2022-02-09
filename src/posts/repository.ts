import { IPost } from './interface';
import { PostDocument, PostModel } from './model';

const create = async (post: IPost): Promise<PostDocument> => {
  return PostModel.create(post);
};

const get = async (): Promise<PostDocument[]> => {
  return PostModel.find().exec();
};

const getById = async (id: string): Promise<PostDocument | null> => {
  return PostModel.findById(id).exec();
};

const findOneAndUpdate = async (
  id: string,
  dataToUpdate: Partial<IPost>,
  isForceCreate = false
): Promise<PostDocument | null> => {
  const res = await PostModel.findOneAndUpdate({ _id: id }, dataToUpdate, {
    upsert: isForceCreate,
    new: true
  });
  return res;
};

const postRepository = {
  create,
  get,
  getById,
  findOneAndUpdate
};

export default postRepository;
