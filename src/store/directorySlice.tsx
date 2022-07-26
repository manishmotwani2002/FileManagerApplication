import { createSlice } from "@reduxjs/toolkit";

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
    removeDirectory: (state, actions) => {
      const currentDirectory = [...actions.payload];

      if (currentDirectory.length > 1) currentDirectory.pop();

      state.directory = currentDirectory;
    },
  },
});

export const { addDirectory, removeDirectory } = directorySlice.actions;

export default directorySlice.reducer;
