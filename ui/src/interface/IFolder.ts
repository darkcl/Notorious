export interface IFolder {
  folders: { [key: string]: IFolder };
  files: IFile[];
  name: string;
  path: string;
}

export interface IFile {
  name: string;
  path: string;
}
