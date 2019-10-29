import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./index";

const AdminRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() && isAuthenticated().user.role === 1 ? (
        <Component {...props} />
      ) : (
        <Redirect to='/signin' />
      )
    }
  />
);

export default AdminRoute;