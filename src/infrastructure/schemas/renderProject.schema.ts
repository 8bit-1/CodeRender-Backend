import { SchemaFactory } from '@nestjs/mongoose';
import { RenderProject } from '../entities/renderProject.entity';

export const renderProjectSchema = SchemaFactory.createForClass(RenderProject);
