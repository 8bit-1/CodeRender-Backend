import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { DataWrapper } from '../utils/utils';
import { User } from '../entities/user.entity';
import { IRenderProjectRepository } from 'src/domain/repositories/RenderProject.interface';
import { RenderProjectModel } from 'src/domain/model/renderProject';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RenderProject } from '../entities/renderProject.entity';
import { BlockModel } from 'src/domain/model/block';
import { Block } from '../entities/block.entity';

export class RenderProjectRepository implements IRenderProjectRepository {
  constructor(
    @InjectModel('user') private readonly userSchema: Model<User>,
    @InjectModel('RenderProject') private readonly renderProjectSchema: Model<RenderProject>,
  ) {}

  async AddProjectToUser(
    idUser: string,
    userEmail: string,
    projectName: string,
    html: string,
    css: string,
    js: string,
  ): Promise<RenderProjectModel> {
    // const result = new DataWrapper<RenderProjectModel>();

    if (idUser) {
      let user = await this.userSchema.findOne({ UserId: idUser }).exec();
      if (!user) throw new NotFoundException(`User with id${idUser} not found`);

      // Create blocks for each file
      let html_block: Block = {
        _id: new mongoose.Types.ObjectId(),
        Name: 'hmtl_file',
        IsFolder: false,
        FileType: 'html',
        Size: 0,
        FileData: html,
        CreatedAt: new Date(),
        ModifiedAt: null,
      };

      let css_block: Block = {
        _id: new mongoose.Types.ObjectId(),
        Name: 'css_file',
        IsFolder: false,
        FileType: 'css',
        Size: 0,
        FileData: css,
        CreatedAt: new Date(),
        ModifiedAt: null,
      };

      let js_block: Block = {
        _id: new mongoose.Types.ObjectId(),
        Name: 'js_file',
        IsFolder: false,
        FileType: 'js',
        Size: 0,
        FileData: js,
        CreatedAt: new Date(),
        ModifiedAt: null,
      };

      // Create RenderProject
      let project: RenderProject = {
        _id: new mongoose.Types.ObjectId(),
        Name: projectName,
        Description: '',
        CssFile: css_block,
        JsFile: js_block,
        HtmlFile: html_block,
        CreatedAt: new Date(),
        ModifiedAt: null,
        Owner: user._id,
      };

      let projectDoc = await this.renderProjectSchema.create({ ...project });
      let projectCreated = await projectDoc.save();

      user.Projects.push(projectCreated._id);
      user.save();
      return projectCreated;
    } else {
      throw new BadRequestException(`Invalid id ${idUser}`);
    }
  }

  async UpdateProject(
    idProject: any,
    idUser: string,
    name: string,
    description: string,
    html: string,
    css: string,
    js: string,
  ): Promise<RenderProjectModel> {
    if (!idUser) throw new BadRequestException('User is required');
    // Validar si el usuario Existe
    let user = await this.userSchema.findOne({ UserId: idUser }).exec();
    if (!user) throw new NotFoundException('User not found');
    if (!mongoose.Types.ObjectId.isValid(idProject)) throw new BadRequestException(`Invalid idProject ${idProject}`);
    // Validar si existe el proyecto
    let project = await this.renderProjectSchema.findById(idProject).exec();
    if (!project) throw new NotFoundException('Project not found');

    project.Name = name;
    project.Description = description;
    project.HtmlFile.FileData = html;
    project.CssFile.FileData = css;
    project.JsFile.FileData = js;
    project.ModifiedAt = new Date();
    // project.UserModify = user.UserId

    await project.save();
    return project;
  }

  async DeleteProject(idUser: string, idProject: any): Promise<RenderProjectModel> {
    if (!idUser) throw new BadRequestException('User is required');

    // Validar si el usuario Existe
    let user = await this.userSchema.findOne({ UserId: idUser }).exec();
    if (!user) throw new NotFoundException('User not found');

    // Validar si el proyecto le pertenece al usuario

    // Validar si existe el proyecto
    if (!mongoose.Types.ObjectId.isValid(idProject)) throw new BadRequestException(`Invalid idProject ${idProject}`);
    let project = await this.renderProjectSchema.findById(idProject).exec();
    if (!project) throw new NotFoundException('Project not found');

    let ownership = user.Projects.find((element) => {
      return project._id.equals(element);
    });

    if (!ownership) throw new BadRequestException('User cannot delete resource');

    // Eliminar referencia del usuario

    let userOwner = await this.userSchema.findById(project.Owner).exec();

    if (userOwner) {
      await userOwner.updateOne({ $pull: { Projects: project.Owner } }).exec();
    }

    await project.deleteOne();

    return project;
  }

  async GetUserProjects(idUser: any): Promise<RenderProjectModel[]> {
    if (!idUser) throw new BadRequestException('User is required');

    // Validar si el usuario Existe
    let user = await this.userSchema.findOne({ UserId: idUser }).exec();
    if (!user) throw new NotFoundException('User not found');
    let projects = await this.renderProjectSchema.find({ Owner: user._id }).exec();

    return projects;
  }
}
