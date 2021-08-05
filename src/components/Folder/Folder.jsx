import React, { useState, useRef, useContext, useEffect } from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import styles from './Folder.module.scss';
import classNames from 'classnames/bind';
import { themeContext } from '../App';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { DropDownMenu } from '../DropDownMenu';
import { Popup } from '../Popup';
import Button from '@material-ui/core/Button';
import { DeleteLoader } from '../Loaders/DeleteLoader';

function Folder(props) {
  const { darkTheme } = useContext(themeContext);
  const [name, setName] = useState('');
  const [edit, setEdit] = useState(false);
  const [deleteClick, setDeteleClick] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const timer = useRef();
  const input = useRef();

  const classes = classNames.bind(styles);

  useEffect(() => {
    setName(props.folderName);
  }, [props.folderName]);

  useEffect(() => {
    if (!edit) return null;
    input.current.focus();
    input.current.select();
  }, [edit, props.id]);

  async function hundleDelete() {
    setDeleteLoader(true);
    setDeteleClick(false);
    props.deleteFunction(props.id);
  }

  function hundleInputChange({ value }) {
    setName(value);
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      props.editFolder(props.id, value);
      timer.current = null;
    }, 1000);
  }

  function hundleFolderClick() {
    if (!edit && !menuClicked) {
      props.changeFolder('open', props.id);
    }
  }

  return (
    <div class={classes('folder', { dark: darkTheme })}>
      <div
        onClick={() => {
          hundleFolderClick();
        }}
        className={classes('folderTitle', { dark: darkTheme })}
      >
        <FolderIcon />

        <input
          className={classes('folderName')}
          disabled={!edit}
          type="text"
          value={name}
          maxLength="18"
          onChange={(event) => hundleInputChange(event.target)}
          ref={input}
          onBlur={() => setEdit(false)}
        />
      </div>
      {!deleteLoader ? (
        <div
          onClick={() => {
            setMenuClicked(!menuClicked);
          }}
          onBlur={() => {
            setTimeout(() => {
              setMenuClicked(false);
            }, 100);
          }}
          className={classes('folderOptionsButton')}
        >
          <Button
            style={{
              maxWidth: '30px',
              maxHeight: '50px',
              minWidth: '30px',
              minHeight: '50px',
              color: 'inherit',
            }}
          >
            <MoreVertIcon />
          </Button>
          {menuClicked && (
            <DropDownMenu
              show={menuClicked}
              menuItems={[
                {
                  title: 'Delete',
                  function: () => {
                    setDeteleClick(true);
                  },
                },
                { title: 'Rename', function: () => setEdit(true) },
              ]}
            />
          )}
        </div>
      ) : (
        <DeleteLoader className="deleteFolderLoader"/>
      )}

      <Popup show={deleteClick}>
        <p>Are you sure you want to delete this folder?</p>
        <Button onClick={hundleDelete} color="primary">
          yes
        </Button>
        <Button onClick={() => setDeteleClick(false)}>no</Button>
      </Popup>
    </div>
  );
}

export default Folder;
