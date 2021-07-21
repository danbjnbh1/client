import React from 'react';
import styles from './Footer.module.scss'
function Footer() {
  return (
    <div>
      <div className={styles.footerPadding} ></div>
      <footer>
        <p>made by dan nachmany</p>
      </footer>
    </div>
  );
}

export default Footer;
