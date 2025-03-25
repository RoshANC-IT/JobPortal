
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false, // For showing loading indicators
        user: null, // User data will be stored here after login
    },
    reducers: {
        // Action to set loading state
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // Action to set user data after successful login
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

// Export the actions for use in components
export const { setLoading, setUser } = authSlice.actions;

export default authSlice.reducer; // Export reducer to use in the store
