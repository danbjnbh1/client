import React, { useContext } from 'react';
import { themeContext } from '../../App';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styles from './FolderBackButton.module.scss';
import classNames from 'classnames/bind';

function FolderBackButton(props) {
  const { darkTheme } = useContext(themeContext);
  const classes = classNames.bind(styles);

  return (
    <Fab
      class={classes('button', {dark: darkTheme})}
      onClick={() => props.changeFolder('back')}
    >
      <ArrowBackIcon fontSize="inherit" />
    </Fab>
  );
}

export default FolderBackButton;
