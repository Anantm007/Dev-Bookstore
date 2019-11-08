import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {listOrders, getStatusValues, updateOrderStatus} from './ApiAdmin';
import Moment from 'moment';

export const Orders = () => {
    
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const {user, token} = isAuthenticated();
    
    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error)
            {
                console.log(data.err);
                setLoading(false);
            }

            else
            {
                setOrders(data);
                setLoading(false);
            }
        })
    }
    
    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if(data.error)
            {
                console.log(data.error);
                setLoading(false);
            }

            else
            {
                setStatusValues(data);
                setLoading(false);
            }
        })
    }

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value)
        .then(data => {
            if(data.error)
            {
                console.log("Status update fail");
            }

            else
            {
                loadOrders()
            }
        })
    }

    const showStatus = (o) => {
        return (<div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select className = "form-control" onChange={(e) => handleStatusChange(e,o._id)}>
                <option>Update Status</option>
                {statusValues.map((status, i) => (
                     <option key={i} value={status}>{status}</option>
                ))}
            </select>
        </div>)
    }

    
    const showOrdersLength = () => {
        if(orders.length > 0)
        {
            return (
                <h2 className="text-danger display-2">Total Orders: {orders.length}</h2>
            )
        }

        else
        {
            return (
                <h1 className="text-danger">No Orders</h1>
            )
        }
    }

    const showInput = (key, value) => {
        return (<div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" className="form-control" value={value} readOnly />
        </div>)
    }

    const showLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>Loading...</h2>
        </div>)
    )

    useEffect(() => {
        loadOrders()
        loadStatusValues()
        showLoading()
        // eslint-disable-next-line
    }, [])

    return (
        <Layout title="Orders" description={`Manage all the orders here`} className="container">
            {showLoading()}
        <div className="row">
            <div className="xs-col-12 col-sm-8">
                {showOrdersLength()}
                {orders.map((o, oIndex) => {
                    return (
                        <div key={oIndex} className="mt-5" style={{borderBottom: "5px solid indigo"}}>
                            <h2 className="mb-5">
                                <span className="bg-primary">
                                    Order Id : {o._id}
                                </span>
                            </h2>
                            <ul className="list-group mb-2">
                                <li className="list-group-item">{showStatus(o)}</li>
                                <li className="list-group-item">Transaction_id: {o.transaction_id}</li>
                                <li className="list-group-item">Amount: {o.amount}</li>
                                <li className="list-group-item">Ordered by: {o.user.name}</li>
                                <li className="list-group-item">Order Date: {Moment(o.createdAt).fromNow()}</li>
                                <li className="list-group-item">Delivery address: {o.address}</li>
                            </ul>

                            <h5 className="mt-4 mb-4 font-italic">
                                Total products in the order: {o.products.length}
                            </h5>

                            {o.products.map((p, pIndex) => {
                                return (<div className="mb-4" key={pIndex} style={{padding: '20px', border: '1px solid indigo'}}>
                                    {showInput('Product name', p.name)}
                                    {showInput('Product price', p.price)}
                                    {showInput('Product total', p.count)}
                                    {showInput('Product id', p._id)}
                                </div>)

                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    </Layout>
    )
}

export default Orders;
