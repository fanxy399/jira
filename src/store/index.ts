import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/auth";
import { projectListSlice } from "./slice/porjectList";

const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
