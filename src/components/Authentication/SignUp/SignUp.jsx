import React, { useState, useContext } from 'react';
import { themeContext, userContext } from '../../App';
import styles from './SignUp.module.scss';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

function SignUp() {
  const { setUser, user } = useContext(userContext);
  const { darkTheme } = useContext(themeContext);

  const [name, setName] = useState();
  const [nameValid, setNameValid] = useState();
  const [passwordValid, setPasswordValid] = useState();
  const [password, setPassword] = useState();
  const [password2Valid, setPassword2Valid] = useState();
  const [password2, setPassword2] = useState();
  const [emailValid, setEmailValid] = useState();
  const [email, setEmail] = useState();
  const [signUpLoader, setSignUpLoader] = useState(false);
  const [error, setError] = useState();

  const localURL = `http://localhost:3001/signUp`;
  // const herokuURL = `https://keeperplus.herokuapp.com/signUp`;
  const signUpHttp = axios.create({
    baseURL: localURL,
  });

  async function sendSignUp(event) {
    event.preventDefault();

    if (nameValid && emailValid && passwordValid && password2Valid) {
      setSignUpLoader(true);

      let { data } = await signUpHttp.post('', { name, email, password });
      setSignUpLoader(false);
      if (data === 'this email exist') {
        setEmailValid('This email already exists');
      } else {
        setUser({ email: data.email, mainFolderId: data.mainFolder._id, name: data.name });
      }
    } else {
      setError('Please fill in all the fields correctly');
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
      setEmailValid('invalid email.');
    }
  }
  function nameChange(event) {
    const input = event.target.value;
    setName(input);
    if (/^[a-zA-Z\s]*$/.test(input)) {
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

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div
      className={`${styles.note} + ${darkTheme ? styles.dark : null} + ${
        styles.SignUpForm
      }`}
    >
      <h1>Sign Up</h1>
      <br />
      <form onSubmit={sendSignUp}>
        <div className="mb-4">
          <label htmlFor="InputUserName" className="form-label">
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
          <label htmlFor="InputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={changeEmail}
            type="email"
            className={
              'form-control ' +
              (emailValid === true && email ? 'is-valid ' : '') +
              (emailValid !== true && email ? 'is-invalid ' : '')
            }
            id="InputEmail1"
            aria-describedby="emailHelp"
          />
          <div className="valid-feedback">Looks good!</div>
          <div id="invalid-email" className="invalid-feedback">
            {emailValid}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="InputPassword1" className="form-label">
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
          <label htmlFor="InputPassword2" className="form-label">
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
            The passwords must be the same.
          </div>
        </div>
        <p className={styles.invalidLogin}>{error}</p>
        {signUpLoader ? (
          <Loader type="TailSpin" height={20} width={20} />
        ) : (
          <div className={!error && styles.loginButtonsDiv}>
            <button type="submit" className="btn btn-warning">
              Sign Up
            </button>
            <p className="ms-2 d-inline"></p>
            <Link to="/login">
              <button
                className="btn-link"
                // onClick={() => props.setIsRegister(true)}
              >
                Log in with an existing user
              </button>
            </Link>
            <p />
          </div>
        )}
      </form>
    </div>
  );
}

export default SignUp;
