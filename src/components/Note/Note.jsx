import React, { useState, useContext, useRef,useEffect } from 'react';
import deleteImg from '../../images/deleteNote.png';
import { themeContext } from '../App';
import styles from './Note.module.scss';
import { TextareaAutosize } from '@material-ui/core';
import classNames from 'classnames/bind';

function Note(props) {
  const { darkTheme } = useContext(themeContext);

  const [isOver, setIsOver] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const timer = useRef();

  let classes = classNames.bind(styles)

  useEffect(() => {
    setTitle(props.noteHeading)
    setContent(props.noteContent);
  },[props.noteContent, props.noteHeading])

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

  function mouseOver() {
    setIsOver(true);
  }
  function mouseOut() {
    setIsOver(false);
  }

  return (
    <div
      className={`${styles.note} + ${darkTheme ? styles.dark : null}`}
      id={props.id}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
    >
      <input
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
        className={`${styles.noteContentInput} + ${styles.noteInput}`}
        onChange={(event) => changeNote(event.target)}
        value={content}
      />
      {isOver && (
        <img
          className={styles.deleteBtn}
          id={props.id}
          onClick={() => {
            props.deleteFunction(props.index, props.id);
          }}
          src={deleteImg}
          alt=""
        />
      )}
    </div>
  );
}

export default Note;
