import React, { useState, useEffect, createContext } from 'react';
import Title from './Header/Title/Title';
import { NoteBoard } from './NoteBoard';
import { Footer } from './Footer';
import { AuthenticationRouting } from './Authentication/AuthenticationRouting';
import loading2 from '../images/loading2.gif';
import axios from 'axios';

const themeContext = createContext();
const userContext = createContext();
const loaderContext = createContext();

function App() {
  const [user, setUser] = useState(false);

  const [isloading, setIsLoading] = useState(false);

  const [DBnotes, setDBnotes] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const bodyElt = document.querySelector('html');
    if (darkTheme) {
      bodyElt.classList.add('darkTheme-body');
    } else {
      bodyElt.classList.remove('darkTheme-body');
    }
  }, [darkTheme]);

  useEffect(() => {
    async function fetchData() {
      if (user.data) {
        setIsLoading(true);
        const response = await axios.get(
          `https://keeperplus.herokuapp.com/${user.data._id}/notes`
        );

        setDBnotes(response.data);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    const themeStorage = sessionStorage.getItem('darkTheme') === 'true';
    const userStorage = localStorage.getItem('user');

    setDarkTheme(themeStorage);
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);

  function logout() {
    localStorage.removeItem('user');
    setUser(false);
  }

  return (
    <userContext.Provider value={{ user, logout, setUser }}>
      <themeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <loaderContext.Provider value={{ setIsLoading }}>
          {isloading ? (
            <>
              <img src={loading2} className="mainLoader" alt="" />
            </>
          ) : (
            <>
              <div>
                {!user ? (
                  <>
                    <Title />
                    <AuthenticationRouting />
                  </>
                ) : (
                  <>
                    <Title logout={logout} user={user} />
                    <NoteBoard DBnotes={DBnotes} setDBnotes={setDBnotes} />
                    <Footer />
                  </>
                )}
                <Footer />
              </div>
            </>
          )}
        </loaderContext.Provider>
      </themeContext.Provider>
    </userContext.Provider>
  );
}

export default App;
export { themeContext, userContext, loaderContext };
