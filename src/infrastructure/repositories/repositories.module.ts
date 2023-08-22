import { Module } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
// import { UsuariosRepository } from './usuarios.repository';
import { MongooseModule } from '@nestjs/mongoose';
// import { UsuarioSchema } from '../entities/usuario.schema';

@Module({
  providers: [TodoRepository],
  exports: [TodoRepository],
  // imports: [MongooseModule.forFeature([{ name: 'usuarios', schema: UsuarioSchema }])],
  imports: [],
})
export class RepositoriesModule {}
