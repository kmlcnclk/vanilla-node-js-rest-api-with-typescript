import User from "../models/user.model";
import { CreateUserType, IUser } from "../types/user.type";

class UserRepository {
  public getUsers(): Promise<IUser[]> {
    return User.find();
  }

  public getUserById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  public createUser({ name, email, password }: CreateUserType): Promise<IUser> {
    return User.create({
      name,
      email,
      password,
    });
  }
}

export default UserRepository;
