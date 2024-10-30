import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNoteById,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // getState is optional but useful to get current state
    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    // build path where to save the new document
    // like: uid/journal/notes/document
    const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes/`));
    dispatch(savingNewNote());
    // insert the new document to firestore
    await setDoc(newDoc, newNote);
    // set note id
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("User uid not exist");
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    // check if note.id is present as it's required for updating
    if (!note.id) {
      console.error("No valid document ID. Cannot save note.");
      return;
    }

    // active note has its id, and firebase will create anotherr note if id is present, so the id needs to be removed
    const noteForFirestore = { ...note };
    //console.log("Data to be saved:", noteForFirestore);
    delete noteForFirestore.id;

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);

    try {
      // not updating the note
      await setDoc(docRef, noteForFirestore, { merge: true });
      dispatch(updateNote(note));
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    // upload all files simultaneuosly
    const fileUploadPromises = [];
    for (const file of files) {
      // without await or .then the promise is not fired, just building an array of promises
      fileUploadPromises.push(fileUpload(file));
    }
    // trigger all promises
    const photoUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(photoUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    try {
      await deleteDoc(docRef);
      dispatch(deleteNoteById(note.id));
    } catch (error) {
      console.log(error);
    }
  };
};
