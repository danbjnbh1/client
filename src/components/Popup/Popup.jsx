import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Popup.module.scss';

export default function Popup({ children, show }) {
  if (!show) return null;
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </>,
    document.getElementById('popup')
  );
}
