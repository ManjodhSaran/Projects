import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    notification: null,
    repoId: null,
    pdfSrc: null,
    appSubjects: [],
    openMessenger: false
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    hideNotification: state => {
      state.notification = null;
    },
    setPdfSrc: (state, action) => {
      state.pdfSrc = action.payload;
    },
    resetPdfSrc: state => {
      state.pdfSrc = null;
    },
    setRepoId: (state, action) => {
      state.repoId = action.payload;
    },
    resetRepoId: state => {
      state.repoId = null;
    },
    setAppSubjects: (state, action) => {
      state.appSubjects = action.payload;
    },
    resetAppSubjects: state => {
      state.appSubjects = null;
    },
    setOpenMessenger: state => {
      state.openMessenger = true;
    },
    closeMessenger: state => {
      state.openMessenger = false;
    },
  },
});

export const {
  login, logout,
  showNotification, hideNotification,
  setRepoId, resetRepoId,
  setAppSubjects,
  setPdfSrc, resetPdfSrc,
  resetAppSubjects,
  setOpenMessenger, closeMessenger,
} = appSlice.actions;

export const selectUser = state => state.app.user;
export const selectNotification = state => state.app.notification;
export const selectRepoId = state => state.app.repoId;
export const selectAppSubjects = state => state.app.appSubjects;
export const selectPdfSource = state => state.app.pdfSrc;
export const selectOpenMessenger = state => state.app.openMessenger;

export default appSlice.reducer;
