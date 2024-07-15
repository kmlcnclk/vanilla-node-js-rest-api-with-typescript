import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "../types/user.type";

export interface IUserDocument extends Document, IUser {}

const UserSchema: Schema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  UserSchema
);
export default User;
