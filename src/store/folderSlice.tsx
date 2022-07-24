import { createSlice } from "@reduxjs/toolkit";

type Folder = {
  name: string;
  content: Array<any>;
  type: string;
  date: string;
  creator: string;
  size: string;
  directory: Array<string>;
};

export interface FoldersState {
  folders: Array<Folder>;
}
const initialState: FoldersState = {
  folders: localStorage.getItem("folders")
    ? JSON.parse(localStorage.getItem("folders") || "{}")
    : [],
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, actions) => {
      const newFolder: Folder = actions.payload.inputContent;

      console.log("Add Folder", actions);

      newFolder.directory = actions.payload.currentDirectory;

      console.log("newFolder", newFolder);

      if (localStorage.getItem("folders")) {
        const prevFolders = JSON.parse(localStorage.getItem("folders") || "{}");
        console.log(prevFolders);
        prevFolders.push(newFolder);
        console.log("prev folders before setting", prevFolders);
        localStorage.setItem("folders", JSON.stringify(prevFolders));
        state.folders = prevFolders;
      } else {
        const foldersArray = [newFolder];
        localStorage.setItem("folders", JSON.stringify(foldersArray));
        state.folders = foldersArray;
      }
    },
    deleteFolder: (state) => {},
  },
});

export const { addFolder, deleteFolder } = foldersSlice.actions;

export default foldersSlice.reducer;
