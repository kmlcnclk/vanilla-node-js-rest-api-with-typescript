import { Pool } from "pg";
import MongoDAO from "../dao/mongo.dao";
import { PostgreSQLDao } from "../dao/postgres.dao";
import PostgresDB from "../db/postgres.db";
import User, { IUserDocument } from "../models/user.model";
import { CreateUserType, IUser } from "../types/user.type";

class UserRepository {
  // userDao: MongoDAO<IUserDocument>;

  userDao: PostgreSQLDao<IUser>;
  postgresDB: PostgresDB;

  constructor() {
    // this.userDao = new MongoDAO<IUserDocument>(User);
    this.postgresDB = new PostgresDB();

    this.userDao = new PostgreSQLDao<IUser>(this.postgresDB.pool, "usersaaa");
  }

  public async getUsers(): Promise<IUser[]> {
    const pool = await this.postgresDB.connect();
    const users = await this.userDao.findAll();

    await pool.release();

    return users;
  }

  public async getUserById(id: string): Promise<IUser | null> {
    const pool = await this.postgresDB.connect();

    const user = await this.userDao.findById(id);
    await pool.release();

    return user;
  }

  public async createUser({
    name,
    email,
    password,
  }: CreateUserType): Promise<IUser> {
    const pool = await this.postgresDB.connect();

    const user = await this.userDao.create({ name, email, password });
    await pool.release();

    return user;
  }
}

export default UserRepository;
