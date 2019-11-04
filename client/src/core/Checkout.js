import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth';
import {getBraintreeClientToken} from './apiCore';
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({products}) => {
    
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userid = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userid, token) => {
        getBraintreeClientToken(userid, token).then(data => {
            if(data.err)
            {
                setData({...data, error: data.err})
            }

            else
            {
                setData({...data, clientToken: data.clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userid, token);
        // eslint-disable-next-line
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0);
    }

    const showCheckOut = () => {
        
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to ='/signin'>
                <button className="btn btn-primary">LOGIN to Checkout</button>
            </Link>
        )
    }

    const buy = () => {
        // send nonce to the server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            console.log(data);
            nonce = data.nonce;
            // once we have nonce(cad type, number etc) send nonce as 'paymentMethodNonce'
            // and also total to be charged

            console.log('send nonce and total to process', nonce, getTotal(products));
        })
        .catch(error => {
            console.log('dropin error', error);
            setData({...data, error: error.message});
        })
    }

    const showDropIn = () => {
        return (
        <div>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options = {{
                        authorization: data.clientToken
                    }} onInstance = {instance => (data.instance = instance)}/>
                    <button onClick={buy} className="btn btn-success">Pay</button>
                </div>
            ) : null}
        </div>
        )
    }

    
    return (
        <div>
            <h2>Total: ₹ {getTotal()}</h2>               
            {showCheckOut()}
        </div>
    )
}

export default Checkout
