import { Module } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
// import { UsuariosRepository } from './usuarios.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { UserRepository } from './user.repository';

@Module({
  providers: [TodoRepository, UserRepository],
  exports: [TodoRepository, UserRepository],
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
})
export class RepositoriesModule {}
