import { DataWrapper } from 'src/infrastructure/utils/utils';
import { UserModel } from '../model/user';
import { RenderProjectModel } from '../model/renderProject';

export interface IRenderProjectRepository {
  AddProjectToUser(
    idUser: string,
    userEmail: string,
    projectName: string,
    html: string,
    css: string,
    js: string,
  ): Promise<RenderProjectModel>;

  UpdateProject(
    idProject: any,
    idUser: string,
    name: string,
    description: string,
    html: string,
    css: string,
    js: string,
  ): Promise<RenderProjectModel>;

  DeleteProject(idUser: string, idProject: any): Promise<RenderProjectModel>;

  GetUserProjects(idUser: any): Promise<RenderProjectModel[]>;

  GetProjectById(idProject: any): Promise<RenderProjectModel>;
}
