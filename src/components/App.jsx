import React, { useState, useEffect, createContext } from 'react';
import Title from './Header/Title/Title';
import { NoteBoard } from './NoteBoard';
import { Footer } from './Footer';
import styles from './App.module.scss';
import classNames from 'classnames/bind';
import { AppLoader } from './Loaders/AppLoader';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Login } from './Authentication/Login';
import { SignUp } from './Authentication/SignUp';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3001';
const themeContext = createContext();
const userContext = createContext();
const loaderContext = createContext();

const classes = classNames.bind(styles);

function App() {
  const [user, setUser] = useState(false);
  const [loader, setLoader] = useState(false);
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
    const themeStorage = localStorage.getItem('darkTheme') === 'true';
    setDarkTheme(themeStorage);
    const fetchCookie = async () => {
      setLoader(true);
      const { data } = await axios.post('/tokenCheck');
      setUser(data);
      setLoader(false);
    };
    fetchCookie();
  }, []);

  function logout() {
    const clearCookie = async () => {
      await axios.post('/clearCookie');
    };
    clearCookie();
    sessionStorage.removeItem('currentFolder')
    setUser(false);
  }

  return (
    <userContext.Provider value={{ user, logout, setUser }}>
      <themeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <Title logout={logout} user={user} />
        {loader ? (
          <AppLoader />
        ) : (
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <ProtectedRoute
                path="/dashboard"
                component={NoteBoard}
              ></ProtectedRoute>
              <Route path="/">
                <Redirect to="/dashboard" />
              </Route>
            </Switch>
          </Router>
        )}
        <Footer />
      </themeContext.Provider>
    </userContext.Provider>
  );
}

export default App;
export { themeContext, userContext, loaderContext };
