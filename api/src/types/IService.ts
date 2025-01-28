export interface IService {
  get?(id: string): any;
  find?(): any[] | Promise<any[]>;
  create?(data: any): any;
  update?(id: string, data: any): any;
  delete?(id: string): any;
}
