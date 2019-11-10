import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';

const AdminDashboard = () => {

    const {user: {_id, name, email, role}} = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card mb-5">
                <h4 className="card-header text-center">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item"><Link to="/create/category" className="nav-link">Create Category</Link></li>
                    <li className="list-group-item"><Link to="/create/product" className="nav-link">Create Product</Link></li>
                    <li className="list-group-item"><Link to="/admin/orders" className="nav-link">Manage Orders</Link></li>
                    <li className="list-group-item"><Link to="/admin/products" className="nav-link">Manage Products</Link></li>
                </ul>

            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5">
            <h3 className="card-header text-center">Admin Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 1 ? 'Admin': `User id : ${_id}`}</li>
            </ul>
            </div>
        )
    }

    return (
        <Layout title="Admin Dashboard" description={`Welcome, ${name}`} className="container-fluid">
            <div className="row">
                <div className="xs-col-12 col-sm-4">
                    {adminLinks()}
                </div>

                <div className="xs-col-12 col-sm-8">
                    {adminInfo()}
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;
