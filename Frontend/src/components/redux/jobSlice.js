import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    searchJobByText: "",
    singleJob: null,
    allAppliedJob: [],
    searchJobQueryText: "", // Correct property name
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAppliedJob: (state, action) => {
      state.allAppliedJob = action.payload;
    },
    setSearchJobQueryText: (state, action) => {
      console.log("Updated query in Redux: ", action.payload); // Check if Redux state updates
      state.searchJobQueryText = action.payload; // Update the query in Redux
    },
  },
});

export const {
  setAllJobs,
  setAllAdminJobs,
  setSearchJobByText,
  setSingleJob,
  setAllAppliedJob,
  setSearchJobQueryText,
} = jobSlice.actions;

export default jobSlice.reducer;
