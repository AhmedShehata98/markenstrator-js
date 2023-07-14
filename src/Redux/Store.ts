import { userSlice } from "./Slice/UserSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { appSlice } from "./Slice/AppSlice";
import { ordersSlice } from "./Slice/OrdersSlice";
import { shoperzAPI } from "../services/shoperzApi.service";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [ordersSlice.name]: ordersSlice.reducer,
    [shoperzAPI.reducerPath]: shoperzAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shoperzAPI.middleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type appDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
