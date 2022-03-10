import React, { useState } from "react";
import styles from "styles/hooks/notepad.module.css";
import type { addText, removeText, note } from "types/hooks/notepad";

export default function useNotepad(): [
  Notepad: React.FC,
  addText: addText,
  removeText: removeText
] {
  const [notes, setNotes] = useState<note[]>([]);

  const Notepad: React.FC = () => {
    return notes.length > 0 ? (
      <div className={`${styles.Notepad}`}>
        <div className={`${styles.NoteBox}`}>
          {notes.map((note) => {
            return (
              <div
                key={note.id}
                className={`${styles.Note} ${note.isError ? styles.Error : ""}`}
              >
                {note.text}
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <></>
    );
  };

  const addText: addText = (
    note = { text: "", timeOut: 0, isError: false, id: "" }
  ) => {
    const { text, timeOut, id, isError } = note;
    //@ts-ignore
    setNotes((prevNote) => [...prevNote, { text, timeOut, isError, id }]);
    if (!!timeOut) {
      setTimeout(() => removeText(id || ""), Number(timeOut) * 1000);
    }
  };

  const removeText: removeText = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id != id);
    });
  };
  return [Notepad, addText, removeText];
}
