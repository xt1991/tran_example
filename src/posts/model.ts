import mongoose, { Document, Model, Schema } from 'mongoose';
import constant from './constant';
import { IPost } from './interface';

export type PostDocument = IPost & Document;

const postSchema: Schema<PostDocument> = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    intro: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    tag: {
      type: [String]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const PostModel: Model<PostDocument> = mongoose.model(
  constant.MODEL_NAME,
  postSchema,
  constant.MODEL_NAME
);
