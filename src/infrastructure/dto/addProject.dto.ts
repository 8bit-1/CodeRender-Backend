import { BlockModel } from 'src/domain/model/block';

export class AddProjectDto {
  UserId: string;
  UserEmail: string;
  ProjectName: string;
  HtmlFile: string;
  CssFile: string;
  JsFile: string;
}
