import React, { useState, useContext } from 'react';
import { userContext, themeContext } from '../App';
import { AddNoteForm } from '../AddNoteForm';
import { AddButton } from '../AddButton';
import Loader from 'react-loader-spinner';
import { Note } from '../Note';
import styles from './NoteBoard.module.scss';
import axios from 'axios';

function NoteBoard(props) {
  const [addLoader, setAddLoader] = useState(0);

  const { user } = useContext(userContext);
  const { darkTheme } = useContext(themeContext);

  const userHttp = axios.create({
    baseURL: `https://keeperplus.herokuapp.com/${user.data._id}`,
  });

  async function addNote(title, content) {
    setAddLoader(addLoader + 1);

    // props.setDBnotes([...props.DBnotes, { title, content }]);

    if (title === '') {
      title = 'New Note';
    }
    if (content === '') {
      content = 'Type here';
    }

    const response = await userHttp.post('/add', { title, content });

    setAddLoader((prevState) => prevState - 1);
    props.setDBnotes(response.data);
  }

  async function deleteNote(noteIndex, noteId) {
    const newDB = [...props.DBnotes];
    newDB.splice(noteIndex, 1);
    props.setDBnotes(newDB);

    await userHttp.delete('/delete', { data: { noteId } });
  }

  async function editNote(noteId, value, elementToChange) {
    const response = await userHttp.put('/update', {
      noteId: noteId,
      value: value,
      elementToChange: elementToChange,
    });

    props.setDBnotes(response.data);
  }
  return (
    <>
      <AddNoteForm addNote={addNote} />

      {props.DBnotes.map((note, index) => {
        return (
          <Note
            key={index}
            index={index}
            id={note._id}
            noteHeading={note.title}
            noteContent={note.content}
            deleteFunction={deleteNote}
            editNote={editNote}
          />
        );
      })}
      <div className={styles.addLoader}>
        <Loader
          type="ThreeDots"
          color={darkTheme ? 'white' : '#f5ba13'}
          height={50}
          width={50}
          visible={addLoader > 0}
        />
      </div>

      <AddButton addNote={addNote} />
    </>
  );
}

export default NoteBoard;
