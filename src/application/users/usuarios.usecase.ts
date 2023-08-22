// import { UsuarioM } from 'src/domain/model/usuario';
// import { ObjectId } from 'mongodb';
// import { IUsuariosRepository } from 'src/domain/repositories/usuariosRepository.interface';

// export class UsuariosUseCases {
//   constructor(private readonly repository: IUsuariosRepository) {}

//   async list(): Promise<UsuarioM[]> {
//     let result = await this.repository.List();
//     return result;
//   }

//   async insert(user: UsuarioM): Promise<UsuarioM> {
//     return await this.repository.Insert(user);
//   }

//   async update(user: UsuarioM): Promise<UsuarioM> {
//     return await this.repository.Update(user);
//   }

//   async delete(id: string): Promise<UsuarioM> {
//     const objectId = new ObjectId(id);
//     return await this.repository.Delete(objectId);
//   }

//   async find(id: string): Promise<UsuarioM> {
//     const objectId = new ObjectId(id);
//     const result = await this.repository.Find(objectId);
//     if (!result.data) throw new Error(result.errorMessage);
//     return result.data;
//   }
// }
