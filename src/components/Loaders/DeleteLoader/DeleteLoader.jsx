import React, { useContext } from 'react';
import Loader from 'react-loader-spinner';
import { themeContext } from '../../App';
import styles from './DeleteLoader.module.scss';

export default function DeleteLoader({ className }) {
  const { darkTheme } = useContext(themeContext);

  return (
      <Loader
      className={styles[className]}
        type="Puff"
        height={20}
        width={20}
        color={darkTheme ? 'white' : 'black'}
      />
  );
}
