import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import { themeContext } from '../App';
import styles from './Path.module.scss';

export default function Path(props) {
  const { darkTheme } = useContext(themeContext);

  let classes = classNames.bind(styles);
  if (!props.show) return null;

  return (
    <div>
      <h1 className={classes('folderTitle', { dark: darkTheme })}>
        {props.path.map((element, index) => {
          return (
            <p
              className={styles.path}
              key={index}
              onClick={() => props.changeFolder('link', element.id)}
            >
              /{element.title}
            </p>
          );
        })}
      </h1>
    </div>
  );
}
