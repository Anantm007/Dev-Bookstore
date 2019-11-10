import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Shop from './core/Shop'
import Cart from './core/Cart'
import Product from './core/Product';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import Profile from './user/UserProfile';
import AddCategory from './admin/AddCateogary';
import AddProduct from './admin/AddProduct';
import UpdateProduct from './admin/UpdateProduct';
import Orders from './admin/Orders';
import ManageProducts from './admin/ManageProducts';
import About from './core/About';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/product/:productId" component={Product} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/about" component={About} />
                <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
                <PrivateRoute exact path="/profile/:userId" component={Profile} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoute exact path="/create/category" component={AddCategory} />
                <AdminRoute exact path="/create/product" component={AddProduct} />
                <AdminRoute exact path="/admin/products/update/:productId" component={UpdateProduct} />
                <AdminRoute exact path="/admin/orders" component={Orders} />
                <AdminRoute exact path="/admin/products" component={ManageProducts} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;