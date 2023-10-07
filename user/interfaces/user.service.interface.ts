export interface IUserService {
  create(createUserDto: any): Promise<any>;
  findAll(): Promise<any[]>;
  findOne(id: string): Promise<any>;
  update(id: string, updateUserDto: any): Promise<void>;
  remove(id: string): Promise<void>;
}
