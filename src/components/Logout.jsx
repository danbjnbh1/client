import React from 'react';

function Logout(props) {
  return (
    <div>
      <p className="hello-p">
        Hello {props.user.data.name} <button onClick={props.logout}>Log out</button>
      </p>
    </div>
  );
}

export default Logout;
