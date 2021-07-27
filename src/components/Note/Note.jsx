import React, { useState, useContext, useRef, useEffect } from 'react';
import { themeContext } from '../App';
import styles from './Note.module.scss';
import { TextareaAutosize } from '@material-ui/core';
import classNames from 'classnames/bind';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function Note(props) {
  const { darkTheme } = useContext(themeContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const timer = useRef();

  let classes = classNames.bind(styles);

  useEffect(() => {
    setTitle(props.noteHeading);
    setContent(props.noteContent);
  }, [props.noteContent, props.noteHeading]);

  function changeNote({ value, id, name }) {
    if (name === 'content') {
      setContent(value);
    } else {
      setTitle(value);
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      props.editNote(id, value, name);
      timer.current = null;
    }, 1000);
  }

  return (
    <div
      className={`${styles.note} + ${darkTheme ? styles.dark : null}`}
      id={props.id}
    >
      <TextareaAutosize
        type="text"
        name="title"
        className={classes('noteHeadingInput', 'noteInput')}
        id={props.id}
        onChange={(event) => changeNote(event.target)}
        value={title}
        autoComplete="off"
      />
      <TextareaAutosize
        type="text"
        name="content"
        id={props.id}
        className={classes('noteContentInput', 'noteInput')}
        onChange={(event) => changeNote(event.target)}
        value={content}
      />
      <IconButton
        onClick={() => {
          props.deleteFunction(props.index, props.id);
        }}
        size="small"
        color="inherit"
        className={classes('deleteBtn')}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default Note;
