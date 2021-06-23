import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        emailData: null,
    },
    reducers: {
        setEmailData: (state, action) => {
            state.emailData = action.payload;
        },
    },
});

export const { setEmailData } = appSlice.actions;

export const selectEmailData = state => state.app.emailData;

export default appSlice.reducer;