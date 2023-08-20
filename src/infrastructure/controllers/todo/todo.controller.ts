import { Controller, Inject, Get } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import { TodoPresenter } from 'src/infrastructure/presenters/todo.presenter';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { GetTodosUseCases } from 'src/applicatons/todo/getTodos.usecase';

@Controller('todo')
@ApiTags('todo')
@ApiResponse({ status: 500, description: 'Internal Error' })
@ApiExtraModels(TodoPresenter)
export class TodoController {
  constructor(
    @Inject(UsecasesProxyModule.GET_TODOS_USECASES_PROXY)
    private readonly getTodosUseCaseProxy: UseCaseProxy<GetTodosUseCases>,
  ) {}

  @Get('sup')
  @ApiResponseType(TodoPresenter, false)
  async getTodos() {
    const data = await this.getTodosUseCaseProxy.getInstance().list();
    return data.map((todo) => new TodoPresenter(todo));
  }
}
