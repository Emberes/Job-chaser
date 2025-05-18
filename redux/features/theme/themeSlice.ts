import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode:
    typeof window !== "undefined" &&
    localStorage.getItem("darkMode") === "true",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", String(state.darkMode));
      document.documentElement.setAttribute(
        "data-theme",
        state.darkMode ? "dark" : "light"
      );
    },
    setTheme(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", String(action.payload));
      document.documentElement.setAttribute(
        "data-theme",
        action.payload ? "dark" : "light"
      );
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
