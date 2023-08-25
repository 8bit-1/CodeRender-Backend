import { Controller, Inject, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserUseCases } from 'src/application/users/user.usecase';
import { UserModel } from 'src/domain/model/user';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import { User } from 'src/infrastructure/entities/user.entity';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';

@Controller('users')
@ApiTags('Users')
@ApiResponse({ status: 500, description: 'Internal Error' })
// @ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.USER_USECASES_PROXY)
    private readonly userUseCaseProxy: UseCaseProxy<UserUseCases>,
  ) {}

  @Get('/')
  @ApiResponseType(User, false)
  async getUsers() {
    const data = await this.userUseCaseProxy.getInstance().list();
    return data;
  }

  @Post('/')
  async insertUser(@Body() user: User) {
    console.log(user);
    const data = await this.userUseCaseProxy.getInstance().insert(user);

    // const data = new UserModel();
    return data;
  }

  @Put('/')
  async updateUser(@Body() user: User) {
    const data = await this.userUseCaseProxy.getInstance().update(user);
    return data;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const data = await this.userUseCaseProxy.getInstance().delete(id);
    return data;
  }

  @Get('/:id')
  @ApiResponseType(User, false)
  async findUser(@Param('id') id: string) {
    const data = await this.userUseCaseProxy.getInstance().find(id);
    return data;
    // return new UserPresenter(data);
  }
}
