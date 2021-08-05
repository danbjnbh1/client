import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { NoteBoard } from '../NoteBoard';
import { userContext } from '../App';

export default function ProtectedRoute({
  component: Component,

  ...rest
}) {
  const { user } = useContext(userContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <NoteBoard {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    ></Route>
  );
}
