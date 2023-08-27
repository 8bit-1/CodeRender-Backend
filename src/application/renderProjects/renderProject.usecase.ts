import { RenderProjectModel } from 'src/domain/model/renderProject';
import { IRenderProjectRepository } from 'src/domain/repositories/RenderProject.interface';

import { AddProjectDto } from 'src/infrastructure/dto/addProject.dto';
import { UpdateProjectDto } from 'src/infrastructure/dto/updateProject.dto';

export class RenderProjectUseCases {
  constructor(private readonly repository: IRenderProjectRepository) {}

  async AddProjectToUser(data: AddProjectDto): Promise<RenderProjectModel> {
    return this.repository.AddProjectToUser(
      data.UserId,
      data.UserEmail,
      data.ProjectName,
      data.HtmlFile,
      data.CssFile,
      data.JsFile,
    );
  }

  async UpdateProject(updateProjectDto: UpdateProjectDto): Promise<RenderProjectModel> {
    return this.repository.UpdateProject(
      updateProjectDto.idProject,
      updateProjectDto.UserId,
      updateProjectDto.ProjectName,
      updateProjectDto.ProjectDescription,
      updateProjectDto.HtmlFile,
      updateProjectDto.CssFile,
      updateProjectDto.JsFile,
    );
  }

  async DeleteProject(idUser: string, idProject: any): Promise<RenderProjectModel> {
    return this.repository.DeleteProject(idUser, idProject);
  }

  async GetUserProjects(idUser: any): Promise<RenderProjectModel[]> {
    return this.repository.GetUserProjects(idUser);
  }
}
