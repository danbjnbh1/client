import React, { useContext } from 'react';
import { themeContext } from '../../App';
import Fab from '@material-ui/core/Fab';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import styles from './AddFolderButton.module.scss';
import classNames from 'classnames/bind';

function AddFolderButton(props) {
  const { darkTheme } = useContext(themeContext);

  const classes = classNames.bind(styles);

  return (
    <Fab
      class={classes('addFolder', { dark: darkTheme })}
      onClick={() => props.addFolder()}
    >
      <CreateNewFolderIcon fontSize="inherit" />
    </Fab>
  );
}

export default AddFolderButton;
