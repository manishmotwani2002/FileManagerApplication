import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FoldersState } from "./folderSlice";

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
      console.log("test");
      console.log(value);
    },
    removeDirectory: (state) => {},
  },
});

export const { addDirectory, removeDirectory } = directorySlice.actions;

export default directorySlice.reducer;
