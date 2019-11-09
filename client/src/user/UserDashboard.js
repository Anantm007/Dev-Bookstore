import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {getPurchaseHistory} from './apiUser';
import moment from "moment";

const UserDashboard = () => {

    const {user: {_id, name, email, role}, token} = isAuthenticated();
    
    const [history, setHistory] = useState([]);

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if(data.error)
            {
                console.log(data.error)
            }
            else
            {
                setHistory(data);
            }
        })
    }

    useEffect(() => {
        init(_id, token)
        //eslint-disable-next-line
    }, [])

    const userLinks = () => {
        return (
            <div className="card mb-5">
                <h4 className="card-header text-center">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item"><Link to="/cart" className="nav-link">My Shopping Cart</Link></li>
                    <li className="list-group-item"><Link to={`/profile/${_id}`} className="nav-link">Update Profile</Link></li>
                </ul>

            </div>
        )
    }

    const userInfo = () => {
        return (
            <div className="card mb-5">
            <h3 className="card-header text-center">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 1 ? 'Admin': `User id : ${_id}`}</li>
            </ul>
            </div>
        )
    }

    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };


    return (
        <Layout title="Dashboard" description={`Welcome, ${name}`} className="container-fluid">
            <div className="row">
                <div className="xs-col-12 col-sm-4">
                    {userLinks()}
                </div>

                <div className="xs-col-12 col-sm-8">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard;
