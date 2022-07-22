import { configureStore } from "@reduxjs/toolkit";
import foldersReducer from "./folderSlice";
import directoryReducer from "./directorySlice";

export const store = configureStore({
  reducer: {
    folders: foldersReducer,
    directory: directoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
