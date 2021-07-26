// const herokuURL = `https://keeperplus.herokuapp.com/${folderId}/notes`;

import React, { useState, useContext } from 'react';
import { userContext, themeContext } from '../App';
import { AddNoteForm } from '../AddNoteForm';
import { AddNoteButton } from '../Buttons/AddNoteButton';
import { AddFolderButton } from '../Buttons/AddFolderButton';
import Loader from 'react-loader-spinner';
import { Note } from '../Note';
import styles from './NoteBoard.module.scss';
import axios from 'axios';
import { Folder } from '../Folder';
import { useEffect } from 'react';
import { FolderBackButton } from '../Buttons/FolderBackButton';
import classNames from 'classnames/bind';
import { useRef } from 'react';

function NoteBoard(props) {
  const [addLoader, setAddLoader] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  const [currentFolder, setCurrentFolder] = useState();
  const [backButton, setBackButton] = useState(true);
  const [path, setPath] = useState();

  const axiosUrl = useRef();

  const { DBnotes, setDBnotes } = props;
  const { user } = useContext(userContext);
  const { darkTheme } = useContext(themeContext);

  let classes = classNames.bind(styles);

  useEffect(() => {
    // when folder change set currentFolder state
    if (currentFolder) {
      if (currentFolder._id === user.data.mainFolder._id) {
        setBackButton(false);
      } else setBackButton(true);
    } else {
      setCurrentFolder(user.data.mainFolder);
    }
  }, [currentFolder, user.data.mainFolder]);

  useEffect(() => {
    // on component render set path, current folder, sessionStorages, fetch notes.
    let folderStorage = sessionStorage.getItem('currentFolder');
    if (!folderStorage) {
      sessionStorage.setItem('currentFolder', user.data.mainFolder._id);
      folderStorage = user.data.mainFolder._id;
    }
    let pathStorage = JSON.parse(sessionStorage.getItem('path'));
    if (!pathStorage) {
      sessionStorage.setItem(
        'path',
        JSON.stringify([{ title: 'main', id: user.data.mainFolder._id }])
      );
    }

    pathStorage = JSON.parse(sessionStorage.getItem('path'));
    setPath(pathStorage);
    setCurrentFolder(folderStorage);

    axiosUrl.current = axios.create({
      baseURL: `http://localhost:3001/${folderStorage}`,
    });

    async function fetchData() {
      setIsLoading(true);
      const response = await axiosUrl.current.get('/notes');
      setCurrentFolder(response.data);
      setDBnotes(response.data.folderContent);
      setIsLoading(false);
    }
    fetchData();
  }, [setDBnotes, user]);

  async function changeFolder(type, folderId) {
    setIsLoading(true);
    if (type === 'back') {
      folderId = currentFolder.parent;
      setPath((prev) => {
        let newPath = prev;
        newPath.pop();
        sessionStorage.setItem('path', JSON.stringify(newPath));
        return newPath;
      });
    } else if (type === 'link') {
      setPath((prev) => {
        let newPath = prev;
        newPath.forEach((element, index) => {
          if (element.id === folderId) {
            newPath.splice(index + 1);
          }
        });
        sessionStorage.setItem('path', JSON.stringify(newPath));
        return newPath;
      });
    }
    sessionStorage.setItem('currentFolder', folderId);
    const response = await axios.get(`http://localhost:3001/${folderId}/notes`);
    if (type === 'open') {
      setPath((prev) => {
        let newPath = prev;
        newPath.push({ title: response.data.title, id: response.data._id });
        sessionStorage.setItem('path', JSON.stringify(newPath));
        return newPath;
      });
    }
    setIsLoading(false);
    setCurrentFolder(response.data);
    setDBnotes(response.data.folderContent);
  }

  async function addFolder() {
    setAddLoader(addLoader + 1);

    const name = 'New Folder';
    const { data } = await axiosUrl.current.post('/addFolder', {
      name,
      type: 'folder',
    });

    setAddLoader((prevState) => prevState - 1);
    setCurrentFolder(data);
    setDBnotes(data.folderContent);
  }

  async function addNote(title, content) {
    setAddLoader(addLoader + 1);

    if (title === '') {
      title = 'New Note';
    }
    if (content === '') {
      content = 'Type here';
    }

    const { data } = await axiosUrl.current.post('/addNote', {
      title,
      content,
      type: 'note',
    });
    setAddLoader((prevState) => prevState - 1);
    setCurrentFolder(data);
    props.setDBnotes(data.folderContent);
  }

  async function deleteFolder(folderIndex, folderId) {
    const newDB = [...props.DBnotes];
    newDB.splice(folderIndex, 1);
    props.setDBnotes(newDB);
    await axiosUrl.current.delete('/deleteFolder', { data: { folderId } });
  }

  async function deleteNote(noteIndex, noteId) {
    const newDB = [...props.DBnotes];
    newDB.splice(noteIndex, 1);
    props.setDBnotes(newDB);
    await axiosUrl.current.delete('/deleteNote', { data: { noteId } });
  }

  async function editNote(noteId, value, elementToChange) {
    const response = await axiosUrl.current.put('/updateNote', {
      noteId: noteId,
      value: value,
      elementToChange: elementToChange,
    });
    setCurrentFolder(response.data);
    setDBnotes(response.data.folderContent);
  }

  async function editFolder(FolderId, value) {
    const response = await axiosUrl.current.put('/updateFolder', {
      folderIdToEdit: FolderId,
      value: value,
    });
    setCurrentFolder(response.data);
    setDBnotes(response.data.folderContent);
  }
  return (
    <>
      <AddNoteForm addNote={addNote} />
      {currentFolder && (
        <h1 className={classes('folderTitle', { dark: darkTheme })}>
          {path.map((element, index) => {
            return (
              <p
                className={styles.path}
                key={index}
                onClick={() => changeFolder('link', element.id)}
              >
                /{element.title}
              </p>
            );
          })}
        </h1>
      )}
      {isloading ? (
        <div className={styles.openFolderLoader}>
          <Loader
            type="Audio"
            color={darkTheme ? 'white' : '#f5ba13'}
            height={150}
            width={150}
          />
        </div>
      ) : (
        <>
          {DBnotes.map((element, index) => {
            if (element.type === 'note') {
              return (
                <Note
                  key={index}
                  index={index}
                  id={element._id}
                  noteHeading={element.title}
                  noteContent={element.content}
                  deleteFunction={deleteNote}
                  editNote={editNote}
                />
              );
            } else if (element.type === 'folder') {
              return (
                <Folder
                  key={index}
                  index={index}
                  id={element._id}
                  folderName={element.title}
                  deleteFunction={deleteFolder}
                  editFolder={editFolder}
                  changeFolder={changeFolder}
                />
              );
            } else return null;
          })}
          <div className={styles.addLoader}>
            <Loader
              type="ThreeDots"
              color={darkTheme ? 'white' : '#f5ba13'}
              height={50}
              width={50}
              visible={addLoader > 0}
            />
          </div>
          {backButton ? <FolderBackButton changeFolder={changeFolder} /> : null}
          <AddFolderButton addFolder={addFolder} />
          <AddNoteButton addNote={addNote} />
        </>
      )}
    </>
  );
}

export default NoteBoard;
