import React, { useContext } from 'react';
import { themeContext } from '../../App';
import Fab from '@material-ui/core/Fab';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import styles from './AddNoteButton.module.scss';
import classNames from 'classnames/bind';

function AddNoteButton(props) {
  const { darkTheme } = useContext(themeContext);
  const classes = classNames.bind(styles);

  return (
    <Fab
      class={classes('addButton', { dark: darkTheme })}
      onClick={() => props.addNote('New Note', 'Type here')}
    >
      <NoteAddIcon fontSize="inherit" />
    </Fab>
  );
}

export default AddNoteButton;
