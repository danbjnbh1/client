/* eslint-disable no-unused-vars */
// const herokuURL = `https://keeperplus.herokuapp.com/${folderId}/notes`;

import React, { useState, useContext } from 'react';
import { userContext, themeContext } from '../App';
import { AddNoteForm } from '../AddNoteForm';
import { AddNoteButton } from '../Buttons/AddNoteButton';
import { AddFolderButton } from '../Buttons/AddFolderButton';
import { Note } from '../Note';
import styles from './NoteBoard.module.scss';
import axios from 'axios';
import { Folder } from '../Folder';
import { Path } from '../Path';
import { OpenFolderLoader } from '../Loaders/OpenFolderLoader';
import { AddLoader } from '../Loaders/AddLoader';
import { useEffect } from 'react';
import { FolderBackButton } from '../Buttons/FolderBackButton';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import { Redirect } from 'react-router-dom';

function NoteBoard(props) {
  const [addLoader, setAddLoader] = useState(0);
  const [folderLoading, setFolderLoading] = useState(false);
  const [currentFolder, setCurrentFolder] = useState();
  const [backButton, setBackButton] = useState(true);
  const [path, setPath] = useState();

  const axiosUrl = useRef();

  const { user } = useContext(userContext);
  const { darkTheme } = useContext(themeContext);

  let classes = classNames.bind(styles);

  useEffect(() => {
    // on component render set path, current folder, sessionStorages, fetch notes.
    let folderStorage = sessionStorage.getItem('currentFolder');

    if (!folderStorage) {
      sessionStorage.setItem('currentFolder', user.mainFolderId);
      folderStorage = user.mainFolderId;
    }

    let pathStorage = JSON.parse(sessionStorage.getItem('path'));
    if (!pathStorage) {
      sessionStorage.setItem(
        'path',
        JSON.stringify([{ title: 'main', id: user.mainFolderId }])
      );
    }

    pathStorage = JSON.parse(sessionStorage.getItem('path'));
    setPath(pathStorage);

    axiosUrl.current = axios.create({
      baseURL: `http://localhost:3001/${folderStorage}`,
    });

    async function fetchData() {
      setFolderLoading(true);
      const response = await axiosUrl.current.get('/notes');
      console.log(response.data);
      setCurrentFolder(response.data);
      setFolderLoading(false);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    // when folder change set back button state
    if (currentFolder?._id === user.mainFolderId) {
      setBackButton(false);
    } else setBackButton(true);
  }, [currentFolder, user]);

  async function changeFolder(type, folderId) {
    if (addLoader) return null;

    setFolderLoading(true);
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
    axiosUrl.current = axios.create({
      baseURL: `http://localhost:3001/${folderId}`,
    });
    sessionStorage.setItem('currentFolder', folderId);
    const response = await axiosUrl.current.get(`/notes`);
    if (type === 'open') {
      setPath((prev) => {
        let newPath = prev;
        newPath.push({ title: response.data.title, id: response.data._id });
        sessionStorage.setItem('path', JSON.stringify(newPath));
        return newPath;
      });
    }
    setFolderLoading(false);
    setCurrentFolder(response.data);
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
  }

  async function deleteFolder(folderId) {
    await axiosUrl.current.delete('/deleteFolder', { data: { folderId } });
    setCurrentFolder((prev) => {
      const folderCopy = { ...prev };
      const index = folderCopy.folderContent.findIndex(
        (element) => element._id === folderId
      );
      folderCopy.folderContent.splice(index, 1);
      return folderCopy;
    });
  }

  async function deleteNote(noteId) {
    await axiosUrl.current.delete('/deleteNote', { data: { noteId } });
    setCurrentFolder((prev) => {
      const folderCopy = { ...prev };
      const index = folderCopy.folderContent.findIndex(
        (element) => element._id === noteId
      );
      console.log(index);
      folderCopy.folderContent.splice(index, 1);
      return folderCopy;
    });
  }

  async function editNote(noteId, value, elementToChange) {
    const response = await axiosUrl.current.put('/updateNote', {
      noteId: noteId,
      value: value,
      elementToChange: elementToChange,
    });
    setCurrentFolder(response.data);
  }

  async function editFolder(FolderId, value) {
    const response = await axiosUrl.current.put('/updateFolder', {
      folderIdToEdit: FolderId,
      value: value,
    });
    setCurrentFolder(response.data);
  }

  return (
    <>
      <AddNoteForm addNote={addNote} />
      <Path path={path} show={currentFolder} changeFolder={changeFolder} />

      <OpenFolderLoader show={folderLoading} />

      {!folderLoading && (
        <>
          {currentFolder?.folderContent.map((element, index) => {
            if (element.type === 'note') {
              return (
                <Note
                  key={element._id}
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
                  key={element._id}
                  id={element._id}
                  folderName={element.title}
                  deleteFunction={deleteFolder}
                  editFolder={editFolder}
                  changeFolder={changeFolder}
                />
              );
            } else return null;
          })}
          <AddLoader show={addLoader} />
          <FolderBackButton show={backButton} changeFolder={changeFolder} />
          <AddFolderButton addFolder={addFolder} />
          <AddNoteButton addNote={addNote} />
        </>
      )}
    </>
  );
}

export default NoteBoard;
