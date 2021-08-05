import React from 'react';
import noteAnimation from '../../../images/note-animation.gif';
import styles from './AppLoader.module.scss'

export default function AppLoader() {
  return <img class={styles.appLoader} src={noteAnimation} alt="" />;
}
