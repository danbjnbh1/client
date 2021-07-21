import React, { useContext } from 'react';
import { themeContext } from '../App';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import styles from './AddButton.module.scss'

function AddBtn(props) {
  const { darkTheme } = useContext(themeContext);

  return (
    <Fab
      class={`${styles.addBtn} + ${darkTheme ? styles.dark : null}`}
      onClick={() => props.addNote('New Note', 'Type here')}
    >
      <Add fontSize="inherit" />
    </Fab>
  );
}

export default AddBtn;
