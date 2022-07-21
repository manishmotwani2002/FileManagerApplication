import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FoldersState {
  folders: Array<{
    name: string;
    content: Array<any>;
    children: FoldersState | null;
    type: string;
  }>;
}

const initialState: FoldersState = {
  folders: [
    {
      name: "New Folder",
      content: [],
      children: null,
      type: "Folder",
    },
  ],
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state) => {},
    deleteFolder: (state) => {},
  },
});

export const { addFolder, deleteFolder } = foldersSlice.actions;

export default foldersSlice.reducer;
