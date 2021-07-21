import React from 'react';
import styles from './LogoutButton.module.scss'


function LogoutButton(props) {

  if(!props.user) {
    return null 
  }
  
  return (
    <div>
      <p class={styles.helloGreeting}>
        Hello {props.user.data.name}{' '}
        <button onClick={props.logout}>Log out</button>
      </p>
    </div>
  );
}

export default LogoutButton;
