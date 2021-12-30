export interface IService<P, R> {
  execute(params: P): Promise<R>;
}
