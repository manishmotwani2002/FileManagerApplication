import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { addDirectory } from "./directorySlice";

type Folder = {
  name: string;
  content: Array<any>;
  type: string;
  date: string;
  creator: string;
  size: string;
};

export interface FoldersState {
  folders: Array<Folder>;
}
const initialState: FoldersState = {
  folders: [],
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, actions) => {
      const { directory } = actions.payload.directory;

      const newFolder: Folder = actions.payload;

      const currentState = state.folders;

      currentState.push(newFolder);
      state.folders = currentState;

      if (localStorage.getItem("folders")) {
        const prevFolders = JSON.parse(localStorage.getItem("folders") || "{}");
        console.log(prevFolders);
        prevFolders.push(state.folders[0]);
        localStorage.setItem("folders", JSON.stringify(prevFolders));
      } else localStorage.setItem("folders", JSON.stringify(state.folders));

      console.log(newFolder);

      // addDirectory(actions.payload.name);
    },
    deleteFolder: (state) => {},
  },
});

export const { addFolder, deleteFolder } = foldersSlice.actions;

export default foldersSlice.reducer;
