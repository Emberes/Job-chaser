import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./features/job/jobSlice";
import themeReducer from "./features/theme/themeSlice";
import AuthStateReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    theme: themeReducer,
    auth: AuthStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
