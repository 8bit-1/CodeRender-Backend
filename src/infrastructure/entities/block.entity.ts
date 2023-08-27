import mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ collection: 'Blocks' })
export class Block {
  _id: mongoose.Types.ObjectId;
  @Prop()
  Name: string;
  @Prop()
  IsFolder: boolean;
  @Prop()
  FileType: string;
  @Prop()
  Size: number;
  @Prop()
  FileData: string;
  @Prop()
  CreatedAt: Date;
  @Prop()
  ModifiedAt: Date | null;
}
