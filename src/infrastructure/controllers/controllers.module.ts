import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { TodoController } from './todo/todo.controller';
import { UserController } from './Users/users.controller';
import { RenderProjectController } from './RenderProjects/renderProject.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [TodoController, UserController, RenderProjectController],
})
export class ControllersModule {}
