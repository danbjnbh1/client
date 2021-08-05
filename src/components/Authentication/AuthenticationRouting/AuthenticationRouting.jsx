import React, { useState } from 'react';
import { Login } from '../Login';
import { SignUp } from '../SignUp';

function AuthenticationRouting(props) {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div>
      {isRegister ? (
        <Login setuser={props.setuser} setIsRegister={setIsRegister} />
      ) : (
        <SignUp setuser={props.setuser} setIsRegister={setIsRegister} />
      )}
    </div>
  );
}

export default AuthenticationRouting;
