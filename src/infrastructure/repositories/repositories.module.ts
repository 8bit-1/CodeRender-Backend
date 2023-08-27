import { Module } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { UserRepository } from './user.repository';
import { renderProjectSchema } from '../schemas/renderProject.schema';
import { RenderProjectRepository } from './renderProject.repository';

@Module({
  providers: [TodoRepository, UserRepository, RenderProjectRepository],
  exports: [TodoRepository, UserRepository, RenderProjectRepository],
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema },
      { name: 'RenderProject', schema: renderProjectSchema },
    ]),
  ],
})
export class RepositoriesModule {}
