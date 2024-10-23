import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";

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
    // insert the new document to firestore
    const docresp = await setDoc(newDoc, newNote);
    console.log({ newDoc, docresp });
  };
};
