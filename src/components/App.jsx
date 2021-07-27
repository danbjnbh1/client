import React, { useState, useEffect, createContext } from 'react';
import Title from './Header/Title/Title';
import { NoteBoard } from './NoteBoard';
import { Footer } from './Footer';
import { AuthenticationRouting } from './Authentication/AuthenticationRouting';
import styles from './App.module.scss';
import classNames from 'classnames/bind';

const themeContext = createContext();
const userContext = createContext();
const loaderContext = createContext();

const classes = classNames.bind(styles);

function App() {
  const [user, setUser] = useState(false);

  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const bodyElt = document.querySelector('html');
    if (darkTheme) {
      bodyElt.classList.add(classes('darkThemeBody'));
    } else {
      bodyElt.classList.remove(classes('darkThemeBody'));
    }
  }, [darkTheme]);

  useEffect(() => {
    const themeStorage = sessionStorage.getItem('darkTheme') === 'true';
    const userStorage = localStorage.getItem('user');
    setDarkTheme(themeStorage);
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);

  function logout() {
    localStorage.clear();
    sessionStorage.clear();
    setUser(false);
  }

  return (
    <userContext.Provider value={{ user, logout, setUser }}>
      <themeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <div>
          {!user ? (
            <>
              <Title />
              <AuthenticationRouting />
            </>
          ) : (
            <>
              <Title logout={logout} user={user} />
              <NoteBoard />
            </>
          )}
        </div>
        <Footer />
      </themeContext.Provider>
    </userContext.Provider>
  );
}

export default App;
export { themeContext, userContext, loaderContext };
