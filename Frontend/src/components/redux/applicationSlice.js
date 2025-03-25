// // applicationSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const applicationSlice = createSlice({
//   name: 'application',
//   initialState: {
//     allApplicants: [],  // Fixed typo here from allApplicantes to allApplicants
//   },
//   reducers: {
//     setAllApplicants: (state, action) => {
//       state.allApplicants = action.payload;  // Corrected field name
//     },
//   },
// });

// export const { setAllApplicants } = applicationSlice.actions;
// export default applicationSlice.reducer;









import { createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    applicants: [],  // Ensuring that the field is named `applicants`
  },
  
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;  // Populate applicants state
    },
  },
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
