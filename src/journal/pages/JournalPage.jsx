import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>jojojojo</Typography> */}
      {/* <NothingSelectedView /> */}
      <NoteView />
    </JournalLayout>
  );
};
