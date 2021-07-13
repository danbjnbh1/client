import React, { useState, useContext } from 'react';
import { themeContext } from './App';
import Fab from '@material-ui/core/Fab';

function AddDiv(props) {
  const { darkTheme } = useContext(themeContext);

  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');

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
        id="add-note-div"
        className={'note ' + (darkTheme ? 'darkTheme-body-note-addDiv' : null)}
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
          class={'add-btn ' + (darkTheme ? 'darkTheme-header-btn' : null)}
        >
          add
        </Fab>
      </div>
    </div>
  );
}

export default AddDiv;
