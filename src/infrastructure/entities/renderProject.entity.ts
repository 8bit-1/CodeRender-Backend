import mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { BlockModel } from 'src/domain/model/block';
import { Block } from './block.entity';

@Schema({ collection: 'RenderProjects' })
export class RenderProject {
  _id: mongoose.Types.ObjectId;
  @Prop()
  Name: string;
  @Prop()
  Description: string;
  @Prop()
  CssFile: Block;
  @Prop()
  JsFile: Block;
  @Prop()
  HtmlFile: Block;
  @Prop()
  CreatedAt: Date;
  @Prop()
  ModifiedAt: Date | null;
  @Prop()
  Owner: mongoose.Types.ObjectId;
}
