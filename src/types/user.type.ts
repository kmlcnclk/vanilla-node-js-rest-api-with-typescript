export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateUserType = {
  name: string;
  email: string;
  password: string;
};
