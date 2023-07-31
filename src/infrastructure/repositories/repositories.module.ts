import { Module } from '@nestjs/common';
import { TodoRepository } from './todo.repository';

@Module({
  providers: [TodoRepository],
  exports: [TodoRepository],
})
export class RepositoriesModule {}
