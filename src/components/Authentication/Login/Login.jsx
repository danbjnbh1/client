import React, { useState, useContext } from 'react';
import { themeContext, userContext } from '../../App';
import styles from './Login.module.scss';
import Loader from 'react-loader-spinner';
import axios from 'axios';

function Login(props) {
  const { setUser } = useContext(userContext);
  const { darkTheme } = useContext(themeContext);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [loginLoader, setLoginLoader] = useState(false);

  const loginHttp = axios.create({
    baseURL: `https://keeperplus.herokuapp.com/login`,
  });

  function changeEmail(event) {
    const input = event.target.value;
    setEmail(input);
  }

  function changePassword(event) {
    const input = event.target.value;
    setPassword(input);
  }

  async function sendLogin(event) {
    event.preventDefault();
    setLoginLoader(true);

    const { data } = await loginHttp.post('', { email, password });

    setLoginLoader(false);
    if (!data) {
      setError('Incorrect account details');
    } else {
      localStorage.setItem('user', JSON.stringify({ data }));
      setUser({ data });
    }
  }

  return (
    <div
      className={`${styles.note} + ${darkTheme ? styles.dark : null} + ${
        styles.loginForm
      }`}
    >
      <h1>Log In</h1>
      <form onSubmit={sendLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={changeEmail}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={changePassword}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <p className={styles.invalidLogin}>{error}</p>
        {loginLoader ? (
          <Loader type="TailSpin" height={20} width={20} />
        ) : (
          <div className={!error && styles.loginButtonsDiv}>
            <button type="submit" className="btn btn-warning d-inline">
              Login
            </button>
            <p className="ms-2 d-inline">
              New in Keeper?{' '}
              <button
                className="btn-link"
                onClick={() => props.setIsRegister(false)}
              >
                Creat an account
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
