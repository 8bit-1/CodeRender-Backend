import { ObjectId } from 'mongodb';
import { UserModel } from 'src/domain/model/user';
import { IUserRepository } from 'src/domain/repositories/user.interface';

export class UserUseCases {
  constructor(private readonly repository: IUserRepository) {}

  async list(): Promise<UserModel[]> {
    let result = await this.repository.List();
    return result;
  }

  async insert(user: UserModel): Promise<UserModel> {
    return await this.repository.Insert(user);
  }

  async update(user: UserModel): Promise<UserModel> {
    return await this.repository.Update(user);
  }

  async delete(id: string): Promise<UserModel> {
    const objectId = new ObjectId(id);
    return await this.repository.Delete(objectId);
  }

  async find(id: string): Promise<UserModel> {
    const objectId = new ObjectId(id);
    const result = await this.repository.Find(objectId);
    if (!result.Data) throw new Error(result.ErrorMessage);
    return result.Data;
  }
}
