import React, { useContext } from 'react';
import { themeContext } from './App';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';

function AddBtn(props) {
  const { darkTheme } = useContext(themeContext);

  return (
    <Fab
      class={'add-btn ' + (darkTheme ? 'darkTheme-header-btn' : null)}
      onClick={() => props.addNote('New Note', 'Type here')}
    >
      <Add fontSize="inherit" />
    </Fab>
  );
}

export default AddBtn;
