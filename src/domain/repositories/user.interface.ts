import { DataWrapper } from 'src/infrastructure/utils/utils';
import { UserModel } from '../model/user';

export interface IUserRepository {
  List(): Promise<UserModel[]>;
  Insert(user: UserModel): Promise<UserModel>;
  Update(user: UserModel): Promise<UserModel>;
  Delete(id: any): Promise<UserModel>;
  Find(id: any): Promise<DataWrapper<UserModel>>;
  // Find(id: number): Promise<DataWrapper<TodoM>>;
}
