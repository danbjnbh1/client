import React, { useState, useContext } from 'react';
import { themeContext } from './App';

function Login(props) {
  const { darkTheme } = useContext(themeContext);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [existUser, setExistUser] = useState(true);

  function changeEmail(event) {
    const input = event.target.value;
    setEmail(input);
  }

  function changePassword(event) {
    const input = event.target.value;
    setPassword(input);
  }

  function sendLogin(event) {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    };

    fetch('https://keeperplus.herokuapp.com/login', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          setExistUser(false);
        } else {
          localStorage.setItem('user', JSON.stringify({data}) );
          props.setuser({ data });
        }
      });
  }

  return (
    <div
      className={'note ' + (darkTheme ? 'darkTheme-body-note-addDiv' : null)}
      id="login-div"
    >
      <h1>Log In</h1>
      <form onSubmit={sendLogin}>
        <div className="mb-3">
          <label htmlfor="email" class="form-label">
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
          <label htmlfor="password" class="form-label">
            Password
          </label>
          <input
            onChange={changePassword}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        {!existUser && <p class="invalid-p">Incorrect account details</p>}
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
      </form>
    </div>
  );
}

export default Login;
