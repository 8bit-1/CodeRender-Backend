// import { InjectModel } from '@nestjs/mongoose';
// import mongoose, { Model } from 'mongoose';
// import { UsuarioM } from 'src/domain/model/usuario';
// import { IUsuariosRepository } from 'src/domain/repositories/usuariosRepository.interface';
// import { DataWrapper } from '../utils/utils';
// import { UsuarioS } from '../entities/usuario.schema';

// export class UsuariosRepository implements IUsuariosRepository {
//   constructor(@InjectModel('usuarios') private readonly usuariosModel: Model<UsuarioS>) {}

//   List(): Promise<UsuarioM[]> {
//     const users = this.usuariosModel.find().exec();
//     return users;
//   }

//   async Insert(user: UsuarioM): Promise<UsuarioM> {
//     user._id = new mongoose.Types.ObjectId();
//     console.log(user);
//     const userCreated = new this.usuariosModel(,);
//     console.log('userCreated', userCreated);
//     return userCreated.save();
//   }

//   async Update(user: UsuarioM): Promise<UsuarioM> {
//     const findResult = await this.Find(user._id);
//     if (!findResult.data) throw new Error(findResult.errorMessage);
//     const result = this.usuariosModel.findByIdAndUpdate(user._id, user).exec();
//     return result;
//   }

//   async Delete(id: mongoose.Types.ObjectId): Promise<UsuarioM> {
//     const findResult = await this.Find(id);
//     if (!findResult.data) throw new Error(findResult.errorMessage);
//     const result = await this.usuariosModel.findByIdAndDelete(id).exec();
//     return result;
//   }

//   async Find(id: mongoose.Types.ObjectId): Promise<DataWrapper<UsuarioM>> {
//     let result = new DataWrapper<UsuarioM>();

//     if (mongoose.Types.ObjectId.isValid(id)) {
//       result.data = await this.usuariosModel.findById(id).exec();
//       if (!result.data) result.errorMessage = `User with id ${id} not found.`;
//     } else {
//       result.errorMessage = `Invalid id ${id}`;
//     }
//     return result;
//   }
// }
