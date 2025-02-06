export interface IService<D, P, T> {
  get?(id: string): Promise<T | null>;
  find?(): any[] | Promise<T[]>;
  create?(data: D): Promise<T>;
  patch?(id: string, data: P): Promise<T>;
  delete?(id: string): Promise<T>;
}
