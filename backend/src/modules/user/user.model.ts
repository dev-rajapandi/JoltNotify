import { CONSTANTS } from '../../config/constants';
import mongoose, { Schema, Document } from 'mongoose';

export interface IDbUser extends Document {
  name: string;
  email: string;
  password: string;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const userSchema = new Schema<IDbUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: CONSTANTS.NAME_MIN_LENGTH,
      maxlength: CONSTANTS.NAME_MAX_LENGTH,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: CONSTANTS.EMAIL_REGEX,
    },
    password: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model<IDbUser>('User', userSchema);

export default User;
