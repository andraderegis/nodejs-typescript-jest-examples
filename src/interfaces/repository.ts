export interface IRepository<T> {
  saveOrUpdate(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<T>;
}
