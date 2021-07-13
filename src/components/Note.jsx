import React, { useState, useContext } from 'react';
import deleteImg from '../images/deleteNote.png';
import { themeContext } from './App';

function Note(props) {
  const { darkTheme } = useContext(themeContext);

  const [isOver, setIsOver] = useState(false);

  function mouseOver() {
    setIsOver(true);
  }
  function mouseOut() {
    setIsOver(false);
  }

  return (
    <div
      className={'note ' + (darkTheme ? 'darkTheme-body-note-addDiv' : null)}
      id={props.id}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
    >
      <p
        className="note-heading"
        name="title"
        id={props.id}
        suppressContentEditableWarning={true}
        onBlur={(event) => props.editNote(props.id, event)}
        contentEditable="true"
      >
        {props.noteHeading}
      </p>
      <p
        name="content"
        id={props.id}
        suppressContentEditableWarning={true}
        onBlur={(event) => props.editNote(props.id, event)}
        contentEditable="true"
      >
        {props.noteContent}
      </p>
      {isOver && (
        <img
          className="delete-btn"
          id={props.id}
          onClick={() => {
            props.deleteFunction(props.id);
          }}
          src={deleteImg}
          alt=""
        />
      )}
    </div>
  );
}

export default Note;
