import React, { useState, useRef, useContext, useEffect } from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import styles from './Folder.module.scss';
import classNames from 'classnames/bind';
import { themeContext } from '../App';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import Button from '@material-ui/core/Button';

function Folder(props) {
  const { darkTheme } = useContext(themeContext);
  const [name, setName] = useState('');
  const [edit, setEdit] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const timer = useRef();

  const classes = classNames.bind(styles);

  useEffect(() => {
    setName(props.folderName);
  }, [props.folderName]);

  async function hundleEditClick() {
    await setEdit(true);
    document.getElementById(props.id).focus();
    document.getElementById(props.id).select();
  }

  async function hundleDeleteClick() {
    props.deleteFunction(props.index, props.id);
  }

  function hundleInputChange({ id, value }) {
    setName(value);
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      props.editFolder(id, value);
      timer.current = null;
    }, 1000);
  }

  function hundleFolderClick() {
    if (!edit && !menuClicked) {
      props.changeFolder('open', props.id);
    }
  }

  return (
    <div
      onClick={(event) => {
        hundleFolderClick();
      }}
      className={classes('folder', { dark: darkTheme })}
    >
      <FolderIcon />

      <input
        className={classes('folderName')}
        disabled={!edit}
        type="text"
        value={name}
        onChange={(event) => hundleInputChange(event.target)}
        id={props.id}
        onBlur={() => setEdit(false)}
      />

      <div className={classes('folderOptionsButton')}>
        <Button
          style={{
            maxWidth: '30px',
            maxHeight: '50px',
            minWidth: '30px',
            minHeight: '50px',
          }}
          onClick={(event) => {
            event.stopPropagation();
            setMenuClicked(!menuClicked);
          }}
          onBlur={() => {
            setTimeout(() => {
              setMenuClicked(false);
            }, 70);
          }}
        >
          <MoreVertIcon />
        </Button>
      </div>
      {menuClicked && (
        <DropDownMenu
          show={menuClicked}
          menuItems={[
            {
              title: 'Delete',
              function: hundleDeleteClick,
            },
            { title: 'Rename', function: hundleEditClick },
          ]}
        />
      )}
    </div>
  );
}

export default Folder;
