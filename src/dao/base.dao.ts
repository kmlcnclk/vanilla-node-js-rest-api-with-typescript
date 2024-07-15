export interface BaseDao<T> {
  findById(id: string): Promise<T | null>;
  findOne(query: any): Promise<T | null>;
  findAll(): Promise<T[]>;
  findByIdAndUpdate?(id: string, update: any, options?: any): Promise<T | null>;
  create(item: T): Promise<T>;
  update?(id: string, item: T): Promise<T | null>;
  updateMany?(query: any, update: any, options?: any): Promise<object>;
  delete(id: any): Promise<boolean | void>;
  exist?(query: any): Promise<any>;
}
