import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/backend/supabaseClient";
import { User } from "@supabase/supabase-js";
import type { RootState } from "../store";
// import { signUp, signIn } from "../../backend/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const signInUser = createAsyncThunk(
  "auth/signIn",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return thunkAPI.rejectWithValue(error.message);
    return data.user;
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return thunkAPI.rejectWithValue(error.message);
    return data.user;
  }
);

export const signOutUser = createAsyncThunk("auth/signOutUser", async () => {
  await supabase.auth.signOut();
  return null;
});

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      supabase.auth.signOut();
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
