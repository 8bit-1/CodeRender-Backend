import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { DataWrapper } from '../utils/utils';
import { IUserRepository } from 'src/domain/repositories/user.interface';
import { UserModel } from 'src/domain/model/user';
import { User } from '../entities/user.entity';
import { BadRequestException } from '@nestjs/common';

export class UserRepository implements IUserRepository {
  constructor(@InjectModel('user') private readonly userSchema: Model<User>) {}

  List(): Promise<UserModel[]> {
    const users = this.userSchema.find().exec();
    return users;
  }

  async Insert(user: UserModel): Promise<UserModel> {
    user._id = new mongoose.Types.ObjectId();
    const userCreated = await this.userSchema.create({ ...user });
    return userCreated.save();
  }

  async Update(user: UserModel): Promise<UserModel> {
    const findResult = await this.Find(user._id);
    if (!findResult.Data) throw new Error(findResult.ErrorMessage);
    const result = this.userSchema.findByIdAndUpdate(user._id, user, { new: true }).exec();
    return result;
  }

  async Delete(id: any): Promise<UserModel> {
    const findResult = await this.Find(id);
    if (!findResult.Data) throw new Error(findResult.ErrorMessage);
    const result = await this.userSchema.findByIdAndDelete(id).exec();
    return result;
  }

  async Find(id: any): Promise<DataWrapper<UserModel>> {
    let result = new DataWrapper<UserModel>();
    if (mongoose.Types.ObjectId.isValid(id)) {
      result.Data = await this.userSchema.findById(id).exec();
      if (!result.Data) result.ErrorMessage = `User with id ${id} not found.`;
    } else {
      result.ErrorMessage = `Invalid id ${id}`;
    }
    return result;
  }

  async FindByUserId(userId: string): Promise<DataWrapper<UserModel>> {
    let result = new DataWrapper<UserModel>();
    if (!userId) throw new BadRequestException();

    result.Data = await this.userSchema.findOne({ UserId: userId }).exec();
    if (!result.Data) result.ErrorMessage = `User with id ${userId} not found.`;
    return result;
  }
}
