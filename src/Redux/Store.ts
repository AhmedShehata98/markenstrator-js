import { userSlice } from "./Slice/UserSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { appSlice } from "./Slice/AppSlice";

const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type appDispatch = typeof store.dispatch;
