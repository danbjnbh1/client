import React from 'react';
import Zoom from '@material-ui/core/Grow';

import styles from './DropDownMenu.module.scss';
import Button from '@material-ui/core/Button';

function DropDownMenu(props) {
  return (
    <Zoom in={props.show}>
      <div className={styles.dropdown}>
        <div className={styles.dropdownContent}>
          {props.menuItems.map((element, index) => {
            return (
              <div key={index} >
                <Button onClick={() => element.function()}>
                  {element.title}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </Zoom>
  );
}

export default DropDownMenu;
