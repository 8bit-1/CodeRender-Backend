import { DynamicModule, Module } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';
import { UseCaseProxy } from './usecases-proxy';
import { GetTodosUseCases } from 'src/usecases/todo/getTodos.usecases';
import { RepositoriesModule } from '../repositories/repositories.module';
import { LoggerModule } from '../logger/logger.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static GET_TODO_USECASES_PROXY = 'getTodoUsecasesProxy';
  static GET_TODOS_USECASES_PROXY = 'getTodosUsecasesProxy';
  static POST_TODO_USECASES_PROXY = 'postTodoUsecasesProxy';
  static DELETE_TODO_USECASES_PROXY = 'deleteTodoUsecasesProxy';
  static PUT_TODO_USECASES_PROXY = 'putTodoUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [TodoRepository],
          provide: UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
          useFactory: (todoRepository: TodoRepository) => new UseCaseProxy(new GetTodosUseCases(todoRepository)),
        },
      ],
      exports: [UsecasesProxyModule.GET_TODOS_USECASES_PROXY],
    };
  }
}
