import { DynamicModule, Module } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';
import { UseCaseProxy } from './usecases-proxy';
import { GetTodosUseCases } from 'src/application/todo/getTodos.usecase';
import { RepositoriesModule } from '../repositories/repositories.module';
import { LoggerModule } from '../logger/logger.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { UserRepository } from '../repositories/user.repository';
import { UserUseCases } from 'src/application/users/user.usecase';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static GET_TODOS_USECASES_PROXY = 'getTodosUsecasesProxy';
  static USER_USECASES_PROXY = 'userUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [TodoRepository],
          provide: UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
          useFactory: (todoRepository: TodoRepository) => new UseCaseProxy(new GetTodosUseCases(todoRepository)),
        },
        {
          inject: [UserRepository],
          provide: UsecasesProxyModule.USER_USECASES_PROXY,
          useFactory: (userRepository: UserRepository) => new UseCaseProxy(new UserUseCases(userRepository)),
        },
      ],
      exports: [UsecasesProxyModule.USER_USECASES_PROXY, UsecasesProxyModule.GET_TODOS_USECASES_PROXY],
    };
  }
}
