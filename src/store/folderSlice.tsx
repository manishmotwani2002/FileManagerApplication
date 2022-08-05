import { createSlice } from "@reduxjs/toolkit";

import { Folder } from "../types/folderTypes";

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

      newFolder.directory = actions.payload.currentDirectory;
      newFolder.folderId = Math.floor(Math.random() * 1000);

      if (localStorage.getItem("folders")) {
        const prevFolders = JSON.parse(localStorage.getItem("folders") || "{}");
        prevFolders.push(newFolder);
        localStorage.setItem("folders", JSON.stringify(prevFolders));
        state.folders = prevFolders;
      } else {
        const foldersArray = [newFolder];
        localStorage.setItem("folders", JSON.stringify(foldersArray));
        state.folders = foldersArray;
      }
    },
    deleteFolder: (state, actions) => {
      //actions.payload
      const currentFolders = JSON.parse(
        localStorage.getItem("folders") || "{}"
      );

      const updatedFolders = currentFolders.filter((folder: Folder) => {
        return folder.folderId !== actions.payload.folderId;
      });
      localStorage.setItem("folders", JSON.stringify(updatedFolders));
      state.folders = updatedFolders;
    },
  },
});

export const { addFolder, deleteFolder } = foldersSlice.actions;

export default foldersSlice.reducer;
