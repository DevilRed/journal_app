import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
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
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
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
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
} = journalSlice.actions;
