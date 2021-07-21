import React, { useContext } from 'react';
import { themeContext } from '../../App';
import styles from './Title.module.scss';
import LogoutBtn from '../LogoutButton/LogoutButton';
import ThemeBtn from '../ThemeButton/ThemeButton';

function Title(props) {
  const { darkTheme } = useContext(themeContext);

  return (
    <header className={darkTheme ? styles.dark : null}>
      <h1>Keeper App</h1>
      <LogoutBtn user={props.user} logout={props.logout} />
      <ThemeBtn />
    </header>
  );
}

export default Title;
