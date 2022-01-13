import mongoose, { Document, Model, Schema } from 'mongoose';
import constant from './constant';
import { IUser } from './interface';

export type UserDocument = IUser & Document;

const userSchema: Schema<UserDocument> = new Schema(
  {
    fullName: {
      type: String,
      index: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    dob: {
      type: String
    },
    fb: {
      type: String
    },
    tw: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const UserModel: Model<UserDocument> = mongoose.model(
  constant.MODEL_NAME,
  userSchema,
  constant.MODEL_NAME
);
