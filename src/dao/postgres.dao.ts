import { BaseDao } from "./base.dao";
import { Pool } from "pg";

export class PostgreSQLDao<T> implements BaseDao<T> {
  private pool: Pool;
  private tableName: string;

  constructor(pool: Pool, tableName: string) {
    this.pool = pool;
    this.tableName = tableName;
  }

  async findAll(): Promise<T[]> {
    const result = await this.pool.query(`SELECT * FROM ${this.tableName}`);
    return result.rows;
  }

  async findById(id: string): Promise<T | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async create(item: T): Promise<T> {
    const keys = Object.keys(item as {}).join(", ");
    const values = Object.values(item as {});
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    const result = await this.pool.query(
      `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders}) RETURNING *`,
      values
    );

    return result.rows[0];
  }

  async update(id: string, item: T): Promise<T | null> {
    const updates = Object.keys(item as {})
      .map((key, i) => `${key} = $${i + 2}`)
      .join(", ");
    const values = Object.values(item as {});

    const result = await this.pool.query(
      `UPDATE ${this.tableName} SET ${updates} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );

    return result.rows[0] || null;
  }

  async delete(id: string): Promise<void> {
    await this.pool.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
  }

  async findOne(query: any): Promise<T | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE ${query}`
    );

    return result.rows[0] || null;
  }
}
