import { createContext, useState } from "react";

export const NoteContext = createContext({});

export const NoteProvider = ({ children }) => {
  const [myNotes, setMyNotes] = useState(null);

  const value = { myNotes, setMyNotes };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
