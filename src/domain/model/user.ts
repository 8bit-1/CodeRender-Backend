import { RenderProjectModel } from './renderProject';

export class UserModel {
  _id?: object;
  UserId: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Projects?: object[];
  // Membership: Object;
}
