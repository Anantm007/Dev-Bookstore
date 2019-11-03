import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth';

const Checkout = ({products}) => {
    
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0);
    }

    const showCheckOut = () => {
        
        return isAuthenticated() ? (
            <button className="btn btn-success">Checkout</button>
        ) : (
            <Link to ='/signin'>
                <button className="btn btn-primary">LOGIN to Checkout</button>
            </Link>
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
