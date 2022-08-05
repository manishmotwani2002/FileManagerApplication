export type Folder = {
  name: string;
  type: string;
  date: string;
  creator: string;
  size: string;
  directory: Array<string>;
  folderId: number;
};

export type FolderName = {
  type: "Folder";
  name: "root";
};
