import React, { useState, useEffect, createContext } from 'react';
import Header from './Header';
import Note from './Note';
import Footer from './Footer';
import AddDiv from './AddDiv';
import AddBtn from './AddBtn';
import SignIn from './SignIn';

const themeContext = createContext();

function App() {
  const [user, setuser] = useState(false);

  const [DBnotes, setDBnotes] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const bodyElt = document.querySelector('html');
    if (darkTheme) {
      bodyElt.classList.add('darkTheme-body-note-addDiv');
    } else {
      bodyElt.classList.remove('darkTheme-body-note-addDiv');
    }
  }, [darkTheme]);

  useEffect(() => {
    if (user.data) {
      fetch('https://keeperplus.herokuapp.com/notes/' + user.data._id)
        .then((response) => response.json())
        .then((data) => setDBnotes(data));
    }
  }, [user]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log(user);
    if (user) {
      setuser(JSON.parse(user));
    }
  }, []);

  function logout() {
    localStorage.removeItem('user');
    setuser(false);
  }

  function addNote(title, content) {
    if (title === '') {
      title = 'New Note';
    }
    if (content === '') {
      content = 'Type here';
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, content: content }),
    };
    fetch('https://keeperplus.herokuapp.com/add/' + user.data._id, requestOptions)
      .then((response) => response.json())
      .then((data) => setDBnotes(data));
  }

  function deleteNote(noteId) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ noteId: noteId }),
    };
    fetch('https://keeperplus.herokuapp.com/delete/' + user.data._id, requestOptions)
      .then((response) => response.json())
      .then((data) => setDBnotes(data));
  }

  function editNote(noteId, event) {
    const value = event.target.innerHTML;
    const elementToChange = event.target.getAttribute('name'); //The type of the element: title or content

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        noteId: noteId,
        value: value,
        elementToChange: elementToChange,
      }),
    };
    fetch('https://keeperplus.herokuapp.com/update/' + user.data._id, requestOptions)
      .then((response) => response.json())
      .then((data) => setDBnotes(data));
  }
  if (!user) {
    return (
      <themeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <div>
          <Header />
          <SignIn setuser={setuser} user={user} />
          <Footer />
        </div>
      </themeContext.Provider>
    );
  } else {
    return (
      <themeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <div>
          <Header logout={logout} user={user} />
          <AddDiv addNote={addNote} />
          {DBnotes.map((note, index) => {
            return (
              <Note
                key={index}
                id={note._id}
                noteHeading={note.title}
                noteContent={note.content}
                deleteFunction={deleteNote}
                editNote={editNote}
              />
            );
          })}
          <AddBtn addNote={addNote} />
          <Footer />
        </div>
      </themeContext.Provider>
    );
  }
}

export default App;
export { themeContext };
