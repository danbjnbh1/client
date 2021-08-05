import React, { useContext } from 'react';
import Loader from 'react-loader-spinner';
import { themeContext } from '../../App';
import styles from './OpenFolderLoader.module.scss';

export default function OpenFolderLoader(props) {
  const { darkTheme } = useContext(themeContext);
  return (
    <div className={styles.openFolderLoader}>
      <Loader
        type="MutatingDots"
        color={darkTheme ? 'white' : '#f5ba13'}
        secondaryColor={darkTheme ? 'white' : '#f5ba13'}
        height={100}
        width={100}
        visible={props.show}
      />
    </div>
  );
}
