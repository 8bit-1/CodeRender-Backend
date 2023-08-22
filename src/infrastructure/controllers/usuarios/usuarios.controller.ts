// import { Controller, Inject, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
// import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
// import { UsuarioPresenter } from 'src/infrastructure/presenters/usuario.presenter';
// import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
// import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
// import { UsuariosUseCases } from 'src/application/users/usuarios.usecase';
// import { UsuarioM } from 'src/domain/model/usuario';

// @Controller('usuarios')
// @ApiTags('Usuarios')
// @ApiResponse({ status: 500, description: 'Internal Error' })
// @ApiExtraModels(UsuarioPresenter)
// export class UsuarioController {
//   constructor(
//     @Inject(UsecasesProxyModule.USUARIO_USECASES_PROXY)
//     private readonly usuariosUseCaseProxy: UseCaseProxy<UsuariosUseCases>,
//   ) {}

//   @Get('/')
//   // @ApiResponseType(UsuarioPresenter, false)
//   async getUsuarios() {
//     const data = await this.usuariosUseCaseProxy.getInstance().list();
//     return data;
//   }

//   @Post('/')
//   async insertUsuario(@Body() user: UsuarioM) {
//     console.log(user);
//     const data = await this.usuariosUseCaseProxy.getInstance().insert(user);

//     // const data = new UsuarioM();
//     return data;
//   }

//   @Put('/')
//   async updateUsuario(@Body() user: UsuarioM) {
//     const data = await this.usuariosUseCaseProxy.getInstance().update(user);
//     return data;
//   }

//   @Delete('/:id')
//   async deleteUsuario(@Param('id') id: string) {
//     const data = await this.usuariosUseCaseProxy.getInstance().delete(id);
//     return data;
//   }

//   @Get('/:id')
//   @ApiResponseType(UsuarioPresenter, false)
//   async findUsuario(@Param('id') id: string) {
//     const data = await this.usuariosUseCaseProxy.getInstance().find(id);
//     return new UsuarioPresenter(data);
//   }
// }
