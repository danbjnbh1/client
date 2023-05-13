import React, { useEffect, useCallback, useRef } from 'react';
import Masonry from 'react-masonry-css';
import { Note } from '../Note';
import { Folder } from '../Folder';
import styles from '../NoteBoard/NoteBoard.module.scss';
import { AddLoader } from '../Loaders/AddLoader';




export default function MasonryLayout(props) {

  const observer = useRef();
  const lastNoteRef = useCallback(
    (note) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (!props.currentFolder) return;

          props.setNotes((prev) => {
            return [...props.currentFolder.folderContent].slice(0, prev.length + 8);
          });
        }
      });
      if (note) observer.current.observe(note);
    },
    [props]
  );


  useEffect(() => {
    if (!props.currentFolder) return;
    if (props.isNewDir || props.notes.length < 8) {
      props.setNotes([...props.currentFolder.folderContent.slice(0, 8)]);
    } else {
      props.setNotes((prev) => {
        return [...props.currentFolder.folderContent.slice(0, prev.length)];
      });
    }
    props.setIsNewDir(false);
  }, [props, props.currentFolder]);

  return (
    <Masonry
            breakpointCols={4}
            className={styles.myMasonryGrid}
            columnClassName={styles.myMasonryGridColumn}
          >
            {props.notes?.map((element, index) => {
              let ref;
              if (props.notes.length === index + 1) {
                ref = lastNoteRef;
              }
              if (element.type === 'note') {
                return (
                  <div key={index} ref={ref}>
                    <Note
                      key={element._id}
                      id={element._id}
                      noteHeading={element.title}
                      noteContent={element.content}
                      deleteFunction={props.deleteNote}
                      editNote={props.editNote}
                    />
                  </div>
                );
              } else if (element.type === 'folder') {
                return (
                  <div key={index} ref={ref}>
                    <Folder
                      key={element._id}
                      id={element._id}
                      folderName={element.title}
                      deleteFunction={props.deleteFolder}
                      editFolder={props.editFolder}
                      changeFolder={props.changeFolder}
                    />
                  </div>
                );
              } else return null;
            })}
            <AddLoader key={0} show={props.addLoader} />
          </Masonry>
  );
}
