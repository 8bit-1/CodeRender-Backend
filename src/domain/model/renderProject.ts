import { BlockModel } from './block';

export class RenderProjectModel {
  _id: Object;
  Name: string;
  Description: string;
  CssFile: BlockModel;
  JsFile: BlockModel;
  HtmlFile: BlockModel;
  CreatedAt: Date;
  ModifiedAt: Date;
  Owner: object;
}
