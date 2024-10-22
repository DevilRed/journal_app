import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: true,
    messageSave: "",
    notes: [],
    active: null,
    // active: {
    // 	id: 'abc123',
    // 	title: '',
    // 	body: '',
    // 	date: 1234567,
    // 	imageUrls: [], //https://foto1.jpg
    // }
  },
  reducers: {
    addNewEmptyNote: (state) => {
      //state.counter += 1;
    },
    setActiveNote: (state, action) => {
      //state.counter += 1;
    },
    setNotes: (state, action) => {
      //state.counter += 1;
    },
    setSaving: (state) => {
      //state.counter += 1;
    },
    updateNote: (state, action) => {
      //state.counter += 1;
    },
    deleteNoteById: (state, action) => {
      //state.counter += 1;
    },
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
} = journalSlice.actions;
