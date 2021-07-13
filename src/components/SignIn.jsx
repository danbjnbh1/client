import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

function SignIn(props) {
  const [isRegister, setIsRegister] = useState(true);

  return <div>{isRegister ? <Login setuser={props.setuser} setIsRegister={setIsRegister} /> : <SignUp setuser={props.setuser}/>}</div>;
}

export default SignIn;
