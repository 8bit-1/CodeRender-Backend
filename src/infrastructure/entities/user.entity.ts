import mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ collection: 'Users' })
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop()
  UserId: string;

  @Prop()
  Email: string;

  @Prop()
  FirstName: string;

  @Prop()
  LastName: string;

  @Prop()
  Projects: mongoose.Types.ObjectId[];

  // @Prop()
  // LastName: string;
}
