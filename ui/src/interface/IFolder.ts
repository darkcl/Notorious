export interface IFolder {
  folders: IFolder[];
  files: IFile[];
  name: string;
  path: string;
}

export interface IFile {
  name: string;
  path: string;
}
