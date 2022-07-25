import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FoldersState } from "./folderSlice";
import { stat } from "fs";

export interface directoryState {
  directory: Array<string>;
}

const initialState: directoryState = {
  directory: ["root"],
};

export const directorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {
    addDirectory: (state, value) => {
      var currentDirectory = JSON.parse(JSON.stringify(state.directory));

      if (value.payload.request === "root") {
        currentDirectory = ["root"];
      }
      currentDirectory.push(value.payload.folderName);
      state.directory = currentDirectory;
    },
    removeDirectory: (state) => {},
  },
});

export const { addDirectory, removeDirectory } = directorySlice.actions;

export default directorySlice.reducer;
