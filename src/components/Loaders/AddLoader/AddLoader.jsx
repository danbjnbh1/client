import React, { useContext } from 'react';
import Loader from 'react-loader-spinner';
import { themeContext } from '../../App';
import styles from './AddLoader.module.scss';

export default function AddLoader(props) {
  const { darkTheme } = useContext(themeContext);
  if (!props.show > 0) return null;
  return (
    <div className={styles.addLoader}>
      <Loader
        type="ThreeDots"
        color={darkTheme ? 'white' : '#f5ba13'}
        height={50}
        width={50}
      />
    </div>
  );
}
