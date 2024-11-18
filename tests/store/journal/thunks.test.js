import { vi } from "vitest";
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { firebaseDB } from "../../../src/firebase/config";

require("dotenv").config({
  path: ".env.testing",
});
// mock .env variables is missing
vi.mock("./src/helpers/getEnvironments", () => ({
  getEnvironments: () => ({ ...process.env }),
}));

describe("thunks", () => {
  const dispatch = vi.fn();
  const getState = vi.fn();

  beforeEach(() => vi.clearAllMocks());

  it("startNewNote should create a new blank note", async () => {
    const uid = "TEST-UID";
    getState.mockReturnValue({ auth: { uid } });

    await startNewNote()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
      })
    );

    // delete docs from firebase
    const collectionRef = collection(firebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    const deletePromises = [];

    // push doc promises into array
    // deleteDoc is a promise from firebase
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

    // run all promises at once
    await Promise.all(deletePromises);
  });
});
