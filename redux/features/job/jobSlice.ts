import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobs } from "../../../api/jobApi";
import { Job } from "../../../components/joblist";

interface JobState {
  jobs: Job[];
  isLoading: boolean;
  error: string;
  searchTerm: string;
  searchPerformed: boolean;
}

const initialState: JobState = {
  jobs: [],
  isLoading: false,
  error: "",
  searchTerm: "",
  searchPerformed: false,
};

export const fetchJobsThunk = createAsyncThunk(
  "jobs/fetchJobs",
  async ({ searchTerm }: { searchTerm: string }) => {
    const result = await fetchJobs(searchTerm, {});
    return result;
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    resetError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.searchPerformed = true;
      })
      .addCase(fetchJobsThunk.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.isLoading = false;
        state.error = action.payload.length === 0 ? "Inga jobb hittades." : "";
      })
      .addCase(fetchJobsThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = "Misslyckades att hämta jobb.";
      });
  },
});

export const { setSearchTerm, resetError } = jobSlice.actions;
export default jobSlice.reducer;
