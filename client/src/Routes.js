import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/PrivateRoute';
import UserDashboard from './user/UserDashboard';
import About from './core/About';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/about" component={About} />
                <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;