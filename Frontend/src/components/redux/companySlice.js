import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: 'company',
  initialState: {
    singleCompany: null,
    companies:[],
    searchCompanyByText:"",

  },
  reducers: {
    setsingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setcompanies: (state, action) => {
      state.companies = action.payload;
    },
    searchCompanyByText:(state, action)=>{
      state.searchCompanyByText = action.payload;
    },

  },
});

export const { setsingleCompany, setcompanies , searchCompanyByText} = companySlice.actions;
export default companySlice.reducer;
