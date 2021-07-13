import React, { useState, useContext } from 'react';
import { themeContext } from './App';


function SignUp(props) {
  const { darkTheme } = useContext(themeContext);

  // TODO remove unnessery null
  const [name, setName] = useState(null);
  const [nameValid, setNameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [password, setPassword] = useState(null);
  const [password2Valid, setPassword2Valid] = useState(false);
  const [password2, setPassword2] = useState(null);
  const [emailValid, setEmailValid] = useState(false);
  const [email, setEmail] = useState(null);

  function sendSignUp(event) {
    event.preventDefault();
    if (nameValid && emailValid && passwordValid && password2Valid) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, password: password, email: email }),
      };
      fetch('https://keeperplus.herokuapp.com/signUp', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data === 'this email exist'){
            setEmailValid(false)
            document.getElementById("invalid-email").innerHTML = "This email already exists"
          } else {
            props.setuser({ data });
          }
        });
    } else {
      return;
    }
  }

  function changeEmail(event) {
    const input = event.target.value;
    setEmail(input);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input).toLowerCase())) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }
  function nameChange(event) {
    const input = event.target.value;
    setName(input);
    if (/^[a-zA-Z]+$/.test(input)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  }

  function chanegPassword(event) {
    const input = event.target.value;
    setPassword(input);
    if (input.length > 5 && /\d/.test(input) && /[a-zA-Z]/.test(input)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }

  function chanegPassword2(event) {
    const password2 = event.target.value;
    const password1 = document.getElementById('InputPassword1').value;
    setPassword2(password2);

    if (password1 === password2 && password2.length !== 0) {
      setPassword2Valid(true);
    } else {
      setPassword2Valid(false);
    }
  }

  return (
    <div
      className={'note ' + (darkTheme ? 'darkTheme-body-note-addDiv' : null)}
      id="login-div"
    >
      <h1>Sign Up</h1>
      <br />
      <form onSubmit={sendSignUp}>
        <div className="mb-4">
          <label htmlfor="InputUserName" class="form-label">
            Name
          </label>
          <input
            onChange={nameChange}
            type="text"
            className={
              'form-control ' +
              (nameValid && name ? 'is-valid ' : '') +
              (!nameValid && name ? 'is-invalid ' : '')
            }
            id="InputUserName"
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            A name must contain only letters
          </div>
        </div>
        <div className="mb-4">
          <label htmlfor="InputEmail1" class="form-label">
            Email address
          </label>
          <input
            onChange={changeEmail}
            type="email"
            className={
              'form-control ' +
              (emailValid && email ? 'is-valid ' : '') +
              (!emailValid && email ? 'is-invalid ' : '')
            }
            id="InputEmail1"
            aria-describedby="emailHelp"
          />
          <div className="valid-feedback">Looks good!</div>
          <div id="invalid-email" className="invalid-feedback">invalid email.</div>
        </div>
        <div className="mb-4">
          <label htmlfor="InputPassword1" class="form-label">
            Password
          </label>
          <input
            onChange={chanegPassword}
            type="password"
            className={
              'form-control ' +
              (passwordValid && password ? 'is-valid ' : '') +
              (!passwordValid && password ? 'is-invalid ' : '')
            }
            id="InputPassword1"
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            The password must contain at least six characters, including at
            least one letter and one number.
          </div>
        </div>
        <div className="mb-4">
          <label htmlfor="InputPassword2" class="form-label">
            Confirm Password
          </label>
          <input
            onChange={chanegPassword2}
            type="password"
            className={
              'form-control ' +
              (password2Valid && password2 ? 'is-valid ' : '') +
              (!password2Valid && password2 ? 'is-invalid ' : '')
            }
            id="InputPassword2"
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Password verification should be the same as a valid genuine
            password.
          </div>
        </div>
        <button type="submit" className="btn btn-warning">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
