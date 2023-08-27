export class BlockModel {
  _id: object;
  Name: string;
  IsFolder: boolean;
  FileType: string;
  Size: number;
  FileData: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  // parentFolder: { type: ObjectId; ref: 'block' }; // points to the parent folder
  // ancestorFolders: [{ type: ObjectId; ref: 'block' }]; // points to all the       ancestors including the parent
}
