export interface IRepository<T> {
  saveOrUpdate(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<T>;
}

export type saveOrUpdate<T> = (entity: T) => Promise<void>;
export type remove = (id: string) => Promise<void>;
export type findById<T> = (id: string) => Promise<T>;
