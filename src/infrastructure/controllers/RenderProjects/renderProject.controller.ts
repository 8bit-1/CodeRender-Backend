import { Controller, Inject, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RenderProjectUseCases } from 'src/application/renderProjects/renderProject.usecase';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import { AddProjectDto } from 'src/infrastructure/dto/addProject.dto';
import { UpdateProjectDto } from 'src/infrastructure/dto/updateProject.dto';
import { RenderProject } from 'src/infrastructure/entities/renderProject.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';

@Controller('projects')
@ApiTags('Projects')
@ApiResponse({ status: 500, description: 'Internal Error' })
@ApiExtraModels(RenderProject)
export class RenderProjectController {
  constructor(
    @Inject(UsecasesProxyModule.RENDER_PROJECT_USECASES_PROXY)
    private readonly renderProjectUseCaseProxy: UseCaseProxy<RenderProjectUseCases>,
  ) {}

  @Post()
  @ApiResponseType(RenderProject, false)
  async addProject(@Body() project: AddProjectDto) {
    const data = await this.renderProjectUseCaseProxy.getInstance().AddProjectToUser(project);
    return data;
  }

  @Put()
  @ApiResponseType(RenderProject, false)
  async updateProject(@Body() project: UpdateProjectDto) {
    const data = await this.renderProjectUseCaseProxy.getInstance().UpdateProject(project);
    return data;
  }

  @Delete('/:idUser/:idProject')
  @ApiResponseType(RenderProject, false)
  async deleteProject(@Param('idUser') idUser: string, @Param('idProject') idProject: string) {
    const data = await this.renderProjectUseCaseProxy.getInstance().DeleteProject(idUser, idProject);
    return data;
  }

  @Get('/:idUser')
  @ApiResponseType(RenderProject, false)
  async getUserProjects(@Param('idUser') idUser: string) {
    const data = await this.renderProjectUseCaseProxy.getInstance().GetUserProjects(idUser);
    return data;
  }

  @Get('/getById/:idProject')
  @ApiResponseType(RenderProject, false)
  async getUserProjectById(@Param('idProject') idProject: string) {
    const data = await this.renderProjectUseCaseProxy.getInstance().GetProjectById(idProject);
    return data;
  }
}
