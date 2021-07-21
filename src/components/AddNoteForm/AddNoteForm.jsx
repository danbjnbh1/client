import React, { useState, useContext } from 'react';
import { themeContext } from '../App';
import Fab from '@material-ui/core/Fab';
import styles from './AddNoteForm.module.scss'
import classNames from 'classnames/bind';

function AddNoteForm(props) {
  const { darkTheme } = useContext(themeContext);

  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');

  const classes = classNames.bind(styles);

  function handleChange(event) {
    const target = event.target.id;
    const value = event.target.value;
    if (target === 'title') {
      setTitleText(value);
    } else if (target === 'content') {
      setContentText(value);
    }
  }

  return (
    <div>
      <div
      className={classes('note', 'addNoteDiv', {'dark': darkTheme})}
      >
        <input
          id="title"
          onChange={handleChange}
          type="text"
          placeholder="Title"
          autoComplete="off"
          value={titleText}
        />
        <textarea
          id="content"
          onChange={handleChange}
          type="text"
          placeholder="Type a note..."
          value={contentText}
        />

        <Fab
          onClick={() => {
            props.addNote(titleText, contentText);
            setContentText('');
            setTitleText('');
          }}
          class={`${styles.addBtn} + ${darkTheme ? styles.dark : null}`}
        >
          add
        </Fab>
      </div>
    </div>
  );
}

export default AddNoteForm;
